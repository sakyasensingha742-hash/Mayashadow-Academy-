/* Maya Shadow Academy — secure R2 admin uploader + product file manager */
(function () {
  'use strict';

  const API_BASE = 'https://mayashadow-academy.onrender.com';

  function esc(value) {
    return String(value || '').replace(/[&<>'"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
    });
  }

  function formatBytes(bytes) {
    const n = Number(bytes || 0);
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
    return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
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
      <p class="panel-subtitle">Upload and manage product files in the private Cloudflare R2 bucket. R2 secret keys never reach this browser.</p>
      <div class="notice" style="margin-bottom:20px">
        <strong>Production storage:</strong> files use temporary 15-minute presigned upload URLs. Maximum file size: 100 MB per file. Student downloads will be protected in the later account/purchase phase.
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

      <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(157,177,202,.16)">
        <h3 style="margin:0 0 8px">Product File Manager</h3>
        <p class="panel-subtitle" style="margin-bottom:16px">View the files currently stored for this Product ID and safely remove an unwanted file.</p>
        <button id="msaR2Refresh" type="button" class="btn">↻ Load Product Files</button>
        <div id="msaR2FileList" style="margin-top:14px"></div>
      </div>
    `;

    const main = document.querySelector('main.container') || document.querySelector('main');
    if (main) main.appendChild(panel);
    else document.body.appendChild(panel);

    const tokenInput = document.getElementById('msaR2Token');
    const productInput = document.getElementById('msaR2Product');
    const categoryInput = document.getElementById('msaR2Category');
    const filesInput = document.getElementById('msaR2Files');
    const uploadButton = document.getElementById('msaR2Upload');
    const refreshButton = document.getElementById('msaR2Refresh');
    const status = document.getElementById('msaR2Status');
    const results = document.getElementById('msaR2Results');
    const fileList = document.getElementById('msaR2FileList');

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
        body: JSON.stringify({ filename: file.name, contentType, size: file.size, category, productId })
      });

      const uploadResponse = await fetch(signed.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file
      });
      if (!uploadResponse.ok) throw new Error(`R2 rejected ${file.name} (${uploadResponse.status})`);
      return { name: file.name, size: file.size, objectKey: signed.objectKey };
    }

    async function loadProductFiles() {
      const token = tokenInput.value.trim();
      const productId = productInput.value.trim();
      const category = categoryInput.value;
      if (!token) return setStatus('Admin Upload Token is required.', 'error');
      if (!productId) return setStatus('Enter a Product ID / Slug first.', 'error');

      refreshButton.disabled = true;
      refreshButton.textContent = 'Loading…';
      fileList.innerHTML = '<div class="notice">Loading files from private R2…</div>';
      try {
        const data = await api(`/api/storage/product-files?category=${encodeURIComponent(category)}&productId=${encodeURIComponent(productId)}`, {
          headers: { 'x-admin-upload-token': token }
        });
        if (!data.files.length) {
          fileList.innerHTML = '<div class="notice">No files found for this product.</div>';
          return;
        }
        fileList.innerHTML = `
          <div class="notice" style="margin-bottom:10px"><strong>${data.files.length} file(s)</strong> in <code>${esc(data.prefix)}</code></div>
          ${data.files.map(function (item) {
            const name = String(item.objectKey || '').split('/').pop();
            const date = item.lastModified ? new Date(item.lastModified).toLocaleString() : '—';
            return `<div class="notice" style="display:flex;gap:14px;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap">
              <div style="min-width:0;flex:1"><strong>${esc(name)}</strong><br><span style="font-size:12px;color:#8fa3bd">${formatBytes(item.size)} · ${esc(date)}</span><br><code style="font-size:11px;color:#b9c9db;word-break:break-all">${esc(item.objectKey)}</code></div>
              <button type="button" class="btn msa-r2-delete" data-key="${esc(item.objectKey)}" style="border-color:rgba(255,90,90,.4);color:#ffb0b0">Delete</button>
            </div>`;
          }).join('')}
        `;
        fileList.querySelectorAll('.msa-r2-delete').forEach(function (button) {
          button.addEventListener('click', async function () {
            const key = button.getAttribute('data-key');
            if (!key || !window.confirm('Delete this file permanently from private R2?')) return;
            button.disabled = true;
            button.textContent = 'Deleting…';
            try {
              await api('/api/storage/product-file', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'x-admin-upload-token': token },
                body: JSON.stringify({ objectKey: key, category, productId })
              });
              setStatus('File deleted successfully from private R2.', 'success');
              await loadProductFiles();
            } catch (error) {
              button.disabled = false;
              button.textContent = 'Delete';
              setStatus(error.message || 'Unable to delete the file.', 'error');
            }
          });
        });
      } catch (error) {
        fileList.innerHTML = '';
        setStatus(error.message || 'Unable to load product files.', 'error');
      } finally {
        refreshButton.disabled = false;
        refreshButton.textContent = '↻ Load Product Files';
      }
    }

    uploadButton.addEventListener('click', async function () {
      const token = tokenInput.value.trim();
      const productId = productInput.value.trim();
      const category = categoryInput.value;
      const files = Array.from(filesInput.files || []);
      if (!token) return setStatus('Admin Upload Token is required.', 'error');
      if (!productId) return setStatus('Enter a Product ID / Slug first.', 'error');
      if (!files.length) return setStatus('Select at least one product file.', 'error');
      if (files.some(function (file) { return file.size > 100 * 1024 * 1024; })) return setStatus('One or more files exceed the 100 MB limit.', 'error');

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
          uploaded.push(await uploadFile(file, token, productId, category));
        }
        results.innerHTML = '<div class="notice" style="border-color:rgba(65,220,150,.3);color:#9ef0c8"><strong>✓ R2 upload complete.</strong><br>' + uploaded.map(function (item) {
          return `<div style="margin-top:8px">${esc(item.name)} — ${formatBytes(item.size)}<br><code style="color:#b9c9db">${esc(item.objectKey)}</code></div>`;
        }).join('') + '</div>';
        setStatus(`${uploaded.length} file(s) uploaded successfully to private Cloudflare R2.`, 'success');
        await loadProductFiles();
      } catch (error) {
        console.error(error);
        setStatus(error.message || 'Secure R2 upload failed.', 'error');
      } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = '☁ Upload Selected Files to Private R2';
      }
    });

    refreshButton.addEventListener('click', loadProductFiles);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
