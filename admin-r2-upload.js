/* Maya Shadow Academy — secure R2 admin uploader */
(function () {
  'use strict';

  const API_BASE = 'https://mayashadow-academy.onrender.com';

  function esc(value) {
    return String(value || '').replace(/[&<>'"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
    });
  }

  function init() {
    if (!/admin\.html$/i.test(location.pathname)) return;
    if (document.getElementById('msa-r2-admin-panel')) return;

    const panel = document.createElement('section');
    panel.id = 'msa-r2-admin-panel';
    panel.className = 'panel';
    panel.style.marginTop = '20px';
    panel.innerHTML = `
      <h2 class="panel-title">Secure R2 File Storage</h2>
      <p class="panel-subtitle">Upload product files directly to the private Cloudflare R2 bucket. R2 secret keys never reach this browser.</p>
      <div class="notice" style="margin-bottom:20px">
        <strong>Production upload:</strong> files are sent directly from your browser to private R2 using a temporary 15-minute upload URL. Maximum file size: 100 MB per file.
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label for="msaR2Token">Admin Upload Token</label>
          <input id="msaR2Token" type="password" autocomplete="off" placeholder="Enter ADMIN_UPLOAD_TOKEN">
        </div>
        <div class="form-group">
          <label for="msaR2Product">Product ID / Slug</label>
          <input id="msaR2Product" type="text" placeholder="bengali-village-man">
        </div>
        <div class="form-group">
          <label for="msaR2Category">Storage Category</label>
          <select id="msaR2Category">
            <option value="characters">Characters</option>
            <option value="character-bundles">Character Bundles</option>
            <option value="backgrounds">Backgrounds</option>
            <option value="props-assets">Props & Assets</option>
            <option value="resources">Resources</option>
          </select>
        </div>
        <div class="form-group">
          <label for="msaR2Files">Product Files</label>
          <input id="msaR2Files" type="file" multiple>
        </div>
        <div class="form-group full">
          <button id="msaR2Upload" type="button" class="btn btn-primary">☁ Upload Selected Files to Private R2</button>
        </div>
      </div>
      <div id="msaR2Status" class="notice" style="margin-top:20px;margin-bottom:0">Ready for secure upload.</div>
      <div id="msaR2Results" style="margin-top:14px"></div>
    `;

    const main = document.querySelector('main.container') || document.querySelector('main');
    if (main) main.appendChild(panel);
    else document.body.appendChild(panel);

    const tokenInput = document.getElementById('msaR2Token');
    const productInput = document.getElementById('msaR2Product');
    const categoryInput = document.getElementById('msaR2Category');
    const filesInput = document.getElementById('msaR2Files');
    const uploadButton = document.getElementById('msaR2Upload');
    const status = document.getElementById('msaR2Status');
    const results = document.getElementById('msaR2Results');

    function setStatus(message, type) {
      status.textContent = message;
      status.style.borderColor = type === 'error' ? 'rgba(255,90,90,.45)' : type === 'success' ? 'rgba(65,220,150,.4)' : 'rgba(53,189,245,.2)';
      status.style.color = type === 'error' ? '#ffb0b0' : type === 'success' ? '#9ef0c8' : '#9db1ca';
    }

    async function api(path, options) {
      const response = await fetch(API_BASE + path, options);
      const data = await response.json().catch(function () { return {}; });
      if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
      return data;
    }

    async function uploadFile(file, token, productId, category) {
      const contentType = file.type || 'application/octet-stream';
      const signed = await api('/api/storage/presign-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-upload-token': token
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: contentType,
          size: file.size,
          category: category,
          productId: productId
        })
      });

      const uploadResponse = await fetch(signed.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error(`R2 rejected ${file.name} (${uploadResponse.status})`);
      }

      return { name: file.name, size: file.size, objectKey: signed.objectKey };
    }

    uploadButton.addEventListener('click', async function () {
      const token = tokenInput.value.trim();
      const productId = productInput.value.trim();
      const category = categoryInput.value;
      const files = Array.from(filesInput.files || []);

      if (!token) return setStatus('Admin Upload Token is required.', 'error');
      if (!productId) return setStatus('Enter a Product ID / Slug first.', 'error');
      if (!files.length) return setStatus('Select at least one product file.', 'error');
      if (files.some(function (file) { return file.size > 100 * 1024 * 1024; })) {
        return setStatus('One or more files exceed the 100 MB limit.', 'error');
      }

      uploadButton.disabled = true;
      uploadButton.textContent = 'Preparing secure R2 upload…';
      results.innerHTML = '';

      try {
        setStatus('Preparing a temporary secure R2 upload URL…');
        const uploaded = [];

        for (let index = 0; index < files.length; index += 1) {
          const file = files[index];
          setStatus(`Uploading ${index + 1} of ${files.length}: ${file.name}`);
          uploadButton.textContent = `Uploading ${index + 1}/${files.length}…`;
          const result = await uploadFile(file, token, productId, category);
          uploaded.push(result);
        }

        results.innerHTML = '<div class="notice" style="border-color:rgba(65,220,150,.3);color:#9ef0c8"><strong>✓ R2 upload complete.</strong><br>' +
          uploaded.map(function (item) {
            return `<div style="margin-top:8px">${esc(item.name)} — ${Math.ceil(item.size / 1024)} KB<br><code style="color:#b9c9db">${esc(item.objectKey)}</code></div>`;
          }).join('') + '</div>';
        setStatus(`${uploaded.length} file(s) uploaded successfully to private Cloudflare R2.`, 'success');
      } catch (error) {
        console.error(error);
        setStatus(error.message || 'Secure R2 upload failed.', 'error');
      } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = '☁ Upload Selected Files to Private R2';
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
