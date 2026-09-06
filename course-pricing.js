/* ============================================================
   MAYA SHADOW ACADEMY — CENTRAL COURSE PRICING SYSTEM
   Version 1.0

   Pricing is intentionally kept separate from course-data.js.
   This lets the Academy add/edit course pricing without changing
   lesson and module data.

   Admin/local overrides are stored under:
   maya_shadow_course_pricing_v1

   Future backend migration can replace this local layer without
   changing the public course API.
============================================================ */

(function(){

    const STORAGE_KEY = "maya_shadow_course_pricing_v1";

    const defaults = {
        "Complete 2.5D Cartoon Story Animation Master Course": {
            salePrice: 1999,
            originalPrice: 3999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: true
        },
        "Cartoon Animator 5 — Complete Professional Course": {
            salePrice: 1999,
            originalPrice: 3499,
            currency: "INR",
            access: "paid",
            published: true,
            featured: true
        },
        "Adobe Photoshop — Complete Professional Course": {
            salePrice: 1499,
            originalPrice: 2499,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Adobe Illustrator — Complete Professional Course": {
            salePrice: 1499,
            originalPrice: 2499,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Adobe Audition — Complete Audio Editing Course": {
            salePrice: 999,
            originalPrice: 1799,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Audacity — Complete Audio Editing Course": {
            salePrice: 799,
            originalPrice: 1499,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "DaVinci Resolve — Complete Video Editing Course": {
            salePrice: 1499,
            originalPrice: 2999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Premiere Pro — Professional Video Editing Course": {
            salePrice: 1499,
            originalPrice: 2999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Voice Over & Narration Masterclass": {
            salePrice: 999,
            originalPrice: 1999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Story Writing Masterclass": {
            salePrice: 799,
            originalPrice: 1499,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Script Writing Masterclass": {
            salePrice: 799,
            originalPrice: 1499,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Complete Story Production": {
            salePrice: 1499,
            originalPrice: 2499,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Character Design Masterclass": {
            salePrice: 999,
            originalPrice: 1999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "AI Video Generation / AI Video Creation": {
            salePrice: 1499,
            originalPrice: 2999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "Blender 3D": {
            salePrice: 1999,
            originalPrice: 3999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "After Effects": {
            salePrice: 1499,
            originalPrice: 2999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        },
        "YouTube Channel Growth": {
            salePrice: 999,
            originalPrice: 1999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        }
    };

    function readOverrides(){
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            const data = raw ? JSON.parse(raw) : {};
            return data && typeof data === "object" ? data : {};
        }catch(error){
            return {};
        }
    }

    function getCoursePricing(course){
        if(!course){
            return {
                salePrice: 0,
                originalPrice: 0,
                currency: "INR",
                access: "paid",
                published: false,
                featured: false,
                discountPercent: 0
            };
        }

        const overrides = readOverrides();
        const base = defaults[course.title] || {
            salePrice: 999,
            originalPrice: 1999,
            currency: "INR",
            access: "paid",
            published: true,
            featured: false
        };

        const value = Object.assign({}, base, overrides[course.id] || {});

        value.discountPercent =
            value.originalPrice > 0 &&
            value.salePrice < value.originalPrice
                ? Math.round(
                    ((value.originalPrice - value.salePrice) /
                    value.originalPrice) * 100
                  )
                : 0;

        return value;
    }

    function saveCoursePricing(courseId, pricing){
        if(!courseId || !pricing){
            return false;
        }

        const overrides = readOverrides();
        overrides[courseId] = Object.assign({}, pricing);

        try{
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(overrides)
            );
            return true;
        }catch(error){
            return false;
        }
    }

    function formatPrice(value, currency){
        const amount = Number(value || 0);
        const symbol = currency === "INR" ? "₹" : currency + " ";
        return symbol + amount.toLocaleString("en-IN");
    }

    window.MayaShadowPricing = {
        version: "1.0",
        defaults: defaults,
        getCoursePricing: getCoursePricing,
        saveCoursePricing: saveCoursePricing,
        formatPrice: formatPrice,
        storageKey: STORAGE_KEY
    };

})();
