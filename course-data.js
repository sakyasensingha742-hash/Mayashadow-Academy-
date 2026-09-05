{
/* ============================================================
    MAYA SHADOW ACADEMY
    MASTER COURSE DATABASE
    Version 1.0
============================================================ *//* =========================================================
   MAYA SHADOW ACADEMY
   MASTER COURSE DATABASE
   Version 1.0
   ========================================================= */

/*
   FUTURE EXPANSION:
   - Add new course inside "courses"
   - Add new module inside "modules"
   - Add new class inside "classes"
   - Video / PDF / Resource / Assignment links can be added later
*/

function makeClass(id, title, duration = "30 min") {
  return {
    id: id,
    title: title,
    duration: duration,

    /* Future lesson system */
    video: "",
    notes: "",
    resources: "",
    assignment: "",
    
    /* Student progress system */
    locked: true,
    completed: false
  };
}

function makeModule(title, classList) {
  return {
    title: title,
    classes: classList
  };
}


/* =========================================================
   MASTER COURSES
   ========================================================= */

const courses = [

  /* =======================================================
     01 — 2.5D CARTOON STORY ANIMATION
     ======================================================= */

  {
    id: "2-5d-animation",
    title: "Complete 2.5D Cartoon Story Animation Master Course",
    category: "Animation",
    icon: "🎬",
    description:
      "Complete professional workflow for creating 2.5D cartoon stories from idea to final YouTube video.",

    modules: [

      makeModule("Module 01 — 2.5D Animation Foundation", [
        makeClass("01", "Introduction to 2.5D Cartoon Animation", "20 min"),
        makeClass("02", "2D vs 2.5D vs 3D Animation", "25 min"),
        makeClass("03", "Complete Animation Production Workflow", "30 min"),
        makeClass("04", "Project Folder & File Management", "20 min"),
        makeClass("05", "Planning a Cartoon Story Project", "30 min")
      ]),

      makeModule("Module 02 — Story & Script Preparation", [
        makeClass("06", "Story Idea Development", "30 min"),
        makeClass("07", "Character Planning", "25 min"),
        makeClass("08", "Scene Breakdown", "30 min"),
        makeClass("09", "Storyboard Creation", "35 min"),
        makeClass("10", "Animation Script Preparation", "30 min")
      ]),

      makeModule("Module 03 — Character Design", [
        makeClass("11", "Cartoon Character Anatomy", "30 min"),
        makeClass("12", "Male Character Design", "35 min"),
        makeClass("13", "Female Character Design", "35 min"),
        makeClass("14", "Child Character Design", "30 min"),
        makeClass("15", "Elderly Character Design", "30 min")
      ]),

      makeModule("Module 04 — Character Preparation & Rigging", [
        makeClass("16", "Character Layer Preparation", "30 min"),
        makeClass("17", "Body Part Separation", "35 min"),
        makeClass("18", "Character Marking & Naming", "30 min"),
        makeClass("19", "Rigging Preparation", "40 min"),
        makeClass("20", "Character Testing", "30 min")
      ]),

      makeModule("Module 05 — Background & Scene Creation", [
        makeClass("21", "Background Design", "30 min"),
        makeClass("22", "Village & Rural Background", "35 min"),
        makeClass("23", "House Interior Scene", "30 min"),
        makeClass("24", "Outdoor Environment", "35 min"),
        makeClass("25", "Scene Layer Management", "30 min")
      ]),

      makeModule("Module 06 — Animation & Movement", [
        makeClass("26", "Basic Character Movement", "30 min"),
        makeClass("27", "Hand & Body Animation", "35 min"),
        makeClass("28", "Walking Animation", "40 min"),
        makeClass("29", "Facial Animation", "35 min"),
        makeClass("30", "Emotional Acting Animation", "40 min")
      ]),

      makeModule("Module 07 — Camera & Cinematic Animation", [
        makeClass("31", "Camera Basics", "25 min"),
        makeClass("32", "Camera Angles", "30 min"),
        makeClass("33", "Camera Movement", "35 min"),
        makeClass("34", "Zoom & Cinematic Shots", "30 min"),
        makeClass("35", "Professional Scene Composition", "40 min")
      ]),

      makeModule("Module 08 — Sound & Voice Over", [
        makeClass("36", "Voice Over Preparation", "25 min"),
        makeClass("37", "Dialogue Timing", "30 min"),
        makeClass("38", "Sound Effects", "30 min"),
        makeClass("39", "Background Music", "25 min"),
        makeClass("40", "Audio & Animation Synchronization", "35 min")
      ]),

      makeModule("Module 09 — Complete Story Production", [
        makeClass("41", "Complete Scene Production", "45 min"),
        makeClass("42", "Character Animation Workflow", "50 min"),
        makeClass("43", "Dialogue & Lip Sync", "40 min"),
        makeClass("44", "Final Scene Assembly", "45 min"),
        makeClass("45", "Complete Cartoon Story Project", "60 min")
      ]),

      makeModule("Module 10 — Final Editing & YouTube Export", [
        makeClass("46", "Final Video Editing", "35 min"),
        makeClass("47", "Color & Visual Correction", "30 min"),
        makeClass("48", "Audio Mastering", "30 min"),
        makeClass("49", "YouTube Export Settings", "25 min"),
        makeClass("50", "Complete Final Project", "60 min")
      ])
    ]
  },


  /* =======================================================
     02 — CARTOON ANIMATOR 5
     ======================================================= */

  {
    id: "cartoon-animator-5",
    title: "Cartoon Animator 5 — Complete Professional Course",
    category: "Animation",
    icon: "🎭",
    description:
      "Learn Cartoon Animator 5 from installation and interface to professional character rigging, facial animation, walking, scenes and complete story production.",

    modules: [

      makeModule("Module 01 — Software Download & Installation", [
        makeClass("01", "Course Introduction", "15 min"),
        makeClass("02", "Cartoon Animator 5 Software Download", "20 min"),
        makeClass("03", "Software Installation", "25 min"),
        makeClass("04", "Basic Setup & Preferences", "20 min"),
        makeClass("05", "Project Folder Setup", "15 min")
      ]),

      makeModule("Module 02 — Complete Software Overview", [
        makeClass("06", "Complete Interface Overview", "30 min"),
        makeClass("07", "Toolbar & Main Tools", "30 min"),
        makeClass("08", "Stage & Timeline", "30 min"),
        makeClass("09", "Content Manager", "25 min"),
        makeClass("10", "Character Controls", "30 min")
      ]),

      makeModule("Module 03 — Character Basics", [
        makeClass("11", "Character Types & Structure", "25 min"),
        makeClass("12", "Character Templates", "25 min"),
        makeClass("13", "Character Layer Structure", "30 min"),
        makeClass("14", "Sprite & Element System", "30 min"),
        makeClass("15", "Character Customization", "35 min")
      ]),

      makeModule("Module 04 — Male Character Making", [
        makeClass("16", "Male Character Planning", "25 min"),
        makeClass("17", "Male Head & Face", "35 min"),
        makeClass("18", "Male Body Construction", "40 min"),
        makeClass("19", "Male Clothing Setup", "35 min"),
        makeClass("20", "Complete Male Character", "45 min")
      ]),

      makeModule("Module 05 — Female Character Making", [
        makeClass("21", "Female Character Planning", "25 min"),
        makeClass("22", "Female Face & Hair", "35 min"),
        makeClass("23", "Female Body Construction", "40 min"),
        makeClass("24", "Saree & Clothing Setup", "40 min"),
        makeClass("25", "Complete Female Character", "45 min")
      ]),

      makeModule("Module 06 — Character Rigging & Advanced Setup", [
        makeClass("26", "Character Rigging Fundamentals", "35 min"),
        makeClass("27", "Bone & Body Setup", "40 min"),
        makeClass("28", "Hand & Foot Setup", "35 min"),
        makeClass("29", "Advanced Character Rigging", "45 min"),
        makeClass("30", "Rig Testing & Troubleshooting", "40 min")
      ]),

      makeModule("Module 07 — Facial Animation & Lip Sync", [
        makeClass("31", "Facial Animation Basics", "30 min"),
        makeClass("32", "Eye & Eyebrow Animation", "30 min"),
        makeClass("33", "Mouth Shapes & Expressions", "35 min"),
        makeClass("34", "Automatic Lip Sync", "35 min"),
        makeClass("35", "Professional Dialogue Animation", "40 min")
      ]),

      makeModule("Module 08 — Walking & Body Animation", [
        makeClass("36", "Body Movement Basics", "30 min"),
        makeClass("37", "Walking Animation", "40 min"),
        makeClass("38", "Running & Fast Movement", "35 min"),
        makeClass("39", "Sitting & Standing Animation", "30 min"),
        makeClass("40", "Emotional Body Acting", "40 min")
      ]),

      makeModule("Module 09 — Scene & Camera Building", [
        makeClass("41", "Scene Composition", "30 min"),
        makeClass("42", "Camera Angles", "30 min"),
        makeClass("43", "Camera Movement", "35 min"),
        makeClass("44", "Cinematic Scene Setup", "40 min"),
        makeClass("45", "Professional Multi-Scene Project", "45 min")
      ]),

      makeModule("Module 10 — Complete Story Animation Project", [
        makeClass("46", "Story Planning", "30 min"),
        makeClass("47", "Scene Production", "45 min"),
        makeClass("48", "Complete Character Animation", "50 min"),
        makeClass("49", "Voice & Sound Synchronization", "40 min"),
        makeClass("50", "Final Story Export", "40 min")
      ])
    ]
  },


  /* =======================================================
     03 — PHOTOSHOP
     ======================================================= */

  {
    id: "photoshop",
    title: "Adobe Photoshop — Complete Professional Course",
    category: "Graphic Design",
    icon: "🖼️",
    description:
      "Master Photoshop from beginner fundamentals to professional photo editing, compositing, background removal and design.",

    modules: [

      makeModule("Module 01 — Photoshop Foundation", [
        makeClass("01", "Introduction to Photoshop", "20 min"),
        makeClass("02", "Interface & Workspace", "25 min"),
        makeClass("03", "Tools Overview", "30 min"),
        makeClass("04", "Document & Canvas Setup", "20 min"),
        makeClass("05", "File Formats & Export", "20 min")
      ]),

      makeModule("Module 02 — Selection & Layer Mastery", [
        makeClass("06", "Selection Tools", "30 min"),
        makeClass("07", "Layers", "30 min"),
        makeClass("08", "Layer Masks", "35 min"),
        makeClass("09", "Smart Objects", "30 min"),
        makeClass("10", "Adjustment Layers", "30 min")
      ]),

      makeModule("Module 03 — Professional Image Editing", [
        makeClass("11", "Color Correction", "30 min"),
        makeClass("12", "Retouching", "35 min"),
        makeClass("13", "Background Removal", "30 min"),
        makeClass("14", "Photo Manipulation", "40 min"),
        makeClass("15", "Professional Image Enhancement", "40 min")
      ]),

      makeModule("Module 04 — Graphic Design", [
        makeClass("16", "Typography", "30 min"),
        makeClass("17", "Poster Design", "40 min"),
        makeClass("18", "Social Media Design", "35 min"),
        makeClass("19", "YouTube Thumbnail Design", "40 min"),
        makeClass("20", "Professional Design Project", "45 min")
      ])
    ]
  },


  /* =======================================================
     04 — ILLUSTRATOR
     ======================================================= */

  {
    id: "illustrator",
    title: "Adobe Illustrator — Complete Professional Course",
    category: "Graphic Design",
    icon: "✏️",
    description:
      "Master vector graphics, logo design, illustration, typography and professional graphic design.",

    modules: [

      makeModule("Module 01 — Illustrator Foundation", [
        makeClass("01", "Introduction to Illustrator", "20 min"),
        makeClass("02", "Interface & Workspace", "25 min"),
        makeClass("03", "Selection & Shape Tools", "30 min"),
        makeClass("04", "Pen Tool", "35 min"),
        makeClass("05", "Drawing Fundamentals", "30 min")
      ]),

      makeModule("Module 02 — Vector Design", [
        makeClass("06", "Shapes & Pathfinder", "30 min"),
        makeClass("07", "Colors & Gradients", "30 min"),
        makeClass("08", "Typography", "30 min"),
        makeClass("09", "Vector Illustration", "40 min"),
        makeClass("10", "Advanced Vector Techniques", "40 min")
      ]),

      makeModule("Module 03 — Professional Projects", [
        makeClass("11", "Logo Design", "45 min"),
        makeClass("12", "Character Vector Design", "45 min"),
        makeClass("13", "Poster Design", "40 min"),
        makeClass("14", "Branding Design", "45 min"),
        makeClass("15", "Final Illustrator Project", "60 min")
      ])
    ]
  },


  /* =======================================================
     05 — ADOBE AUDITION
     ======================================================= */

  {
    id: "audition",
    title: "Adobe Audition — Complete Audio Editing Course",
    category: "Audio & Voice",
    icon: "🎙️",
    description:
      "Professional audio recording, cleaning, editing, mixing, mastering and voice-over production.",

    modules: [

      makeModule("Module 01 — Recording Foundation", [
        makeClass("01", "Audio Basics", "20 min"),
        makeClass("02", "Microphone Setup", "25 min"),
        makeClass("03", "Recording Settings", "25 min"),
        makeClass("04", "Professional Recording Workflow", "30 min"),
        makeClass("05", "Recording Room Preparation", "25 min")
      ]),

      makeModule("Module 02 — Voice Editing", [
        makeClass("06", "Noise Reduction", "30 min"),
        makeClass("07", "Breath & Mouth Noise Cleaning", "30 min"),
        makeClass("08", "EQ", "30 min"),
        makeClass("09", "Compression", "30 min"),
        makeClass("10", "Voice Enhancement", "35 min")
      ]),

      makeModule("Module 03 — Mixing & Mastering", [
        makeClass("11", "Music & Voice Mixing", "35 min"),
        makeClass("12", "Sound Effects Mixing", "30 min"),
        makeClass("13", "Loudness Control", "30 min"),
        makeClass("14", "Mastering", "35 min"),
        makeClass("15", "Professional Voice-Over Project", "45 min")
      ])
    ]
  },


  /* =======================================================
     06 — AUDACITY
     ======================================================= */

  {
    id: "audacity",
    title: "Audacity — Complete Voice Recording & Editing Course",
    category: "Audio & Voice",
    icon: "🎧",
    description:
      "Learn professional voice recording, cleaning, editing and mastering using Audacity.",

    modules: [

      makeModule("Module 01 — Audacity Foundation", [
        makeClass("01", "Audacity Introduction", "20 min"),
        makeClass("02", "Interface Overview", "20 min"),
        makeClass("03", "Microphone Setup", "25 min"),
        makeClass("04", "Recording Voice", "25 min"),
        makeClass("05", "Project Management", "20 min")
      ]),

      makeModule("Module 02 — Voice Cleaning", [
        makeClass("06", "Noise Reduction", "30 min"),
        makeClass("07", "Silence & Breath Editing", "25 min"),
        makeClass("08", "EQ & Tone", "30 min"),
        makeClass("09", "Compression", "30 min"),
        makeClass("10", "Voice Enhancement", "30 min")
      ]),

      makeModule("Module 03 — Final Voice Production", [
        makeClass("11", "Music & Voice Mixing", "30 min"),
        makeClass("12", "Sound Effects", "25 min"),
        makeClass("13", "Loudness & Normalization", "30 min"),
        makeClass("14", "Mastering", "30 min"),
        makeClass("15", "Complete Narration Project", "45 min")
      ])
    ]
  },


  /* =======================================================
     07 — DAVINCI RESOLVE
     ======================================================= */

  {
    id: "davinci",
    title: "DaVinci Resolve — Complete Professional Video Editing",
    category: "Video Editing",
    icon: "🎞️",
    description:
      "Complete professional video editing workflow using DaVinci Resolve.",

    modules: [

      makeModule("Module 01 — Resolve Foundation", [
        makeClass("01", "Installation & Setup", "20 min"),
        makeClass("02", "Complete Interface", "30 min"),
        makeClass("03", "Media Management", "25 min"),
        makeClass("04", "Project Settings", "20 min"),
        makeClass("05", "Timeline Basics", "25 min")
      ]),

      makeModule("Module 02 — Professional Editing", [
        makeClass("06", "Cutting & Trimming", "30 min"),
        makeClass("07", "Transitions", "25 min"),
        makeClass("08", "Text & Titles", "30 min"),
        makeClass("09", "Audio Editing", "30 min"),
        makeClass("10", "Multicam Editing", "35 min")
      ]),

      makeModule("Module 03 — Color & Export", [
        makeClass("11", "Color Correction", "35 min"),
        makeClass("12", "Color Grading", "40 min"),
        makeClass("13", "Effects", "30 min"),
        makeClass("14", "Professional Export", "25 min"),
        makeClass("15", "Complete Video Editing Project", "60 min")
      ])
    ]
  },


  /* =======================================================
     08 — PREMIERE PRO
     ======================================================= */

  {
    id: "premiere-pro",
    title: "Adobe Premiere Pro — Professional Video Editing",
    category: "Video Editing",
    icon: "🎥",
    description:
      "Learn professional editing, transitions, audio, titles, color correction and complete video production.",

    modules: [

      makeModule("Module 01 — Premiere Pro Foundation", [
        makeClass("01", "Installation & Setup", "20 min"),
        makeClass("02", "Interface Overview", "30 min"),
        makeClass("03", "Project & Media Management", "25 min"),
        makeClass("04", "Sequence Settings", "25 min"),
        makeClass("05", "Timeline Workflow", "30 min")
      ]),

      makeModule("Module 02 — Professional Editing", [
        makeClass("06", "Cutting & Trimming", "30 min"),
        makeClass("07", "Transitions", "25 min"),
        makeClass("08", "Text & Titles", "30 min"),
        makeClass("09", "Speed & Time Remapping", "30 min"),
        makeClass("10", "Multicam Editing", "35 min")
      ]),

      makeModule("Module 03 — Audio, Color & Export", [
        makeClass("11", "Audio Editing", "30 min"),
        makeClass("12", "Color Correction", "35 min"),
        makeClass("13", "Effects", "35 min"),
        makeClass("14", "Professional Export", "25 min"),
        makeClass("15", "Complete Editing Project", "60 min")
      ])
    ]
  },


  /* =======================================================
     09 — VOICE OVER
     ======================================================= */

  {
    id: "voice-over",
    title: "Voice Over & Narration — Professional Masterclass",
    category: "Audio & Voice",
    icon: "🎤",
    description:
      "Develop professional voice control, pronunciation, emotion, narration, dialogue delivery and recording skills.",

    modules: [

      makeModule("Module 01 — Voice Foundation", [
        makeClass("01", "Understanding Your Voice", "25 min"),
        makeClass("02", "Breathing Control", "25 min"),
        makeClass("03", "Voice Warm-Up", "20 min"),
        makeClass("04", "Resonance Practice", "25 min"),
        makeClass("05", "Daily Voice Training", "30 min")
      ]),

      makeModule("Module 02 — Pronunciation & Clarity", [
        makeClass("06", "Clear Pronunciation", "30 min"),
        makeClass("07", "Bengali Diction Practice", "30 min"),
        makeClass("08", "Consonant Practice", "25 min"),
        makeClass("09", "Vowel Practice", "25 min"),
        makeClass("10", "Professional Reading Practice", "30 min")
      ]),

      makeModule("Module 03 — Emotion & Acting", [
        makeClass("11", "Understanding Emotion", "30 min"),
        makeClass("12", "Happy & Sad Delivery", "30 min"),
        makeClass("13", "Anger & Fear", "30 min"),
        makeClass("14", "Suspense & Mystery", "30 min"),
        makeClass("15", "Professional Character Acting", "40 min")
      ]),

      makeModule("Module 04 — Story Narration", [
        makeClass("16", "Narration Fundamentals", "30 min"),
        makeClass("17", "Pause & Timing", "30 min"),
        makeClass("18", "Emphasis & Stress", "25 min"),
        makeClass("19", "Storytelling Voice", "35 min"),
        makeClass("20", "Complete Story Narration", "45 min")
      ])
    ]
  },


  /* =======================================================
     10 — STORY WRITING
     ======================================================= */

  {
    id: "story-writing",
    title: "Story Writing Masterclass",
    category: "YouTube & Story",
    icon: "📖",
    description:
      "Learn how to develop powerful stories, characters, conflict, emotion, suspense and satisfying endings.",

    modules: [

      makeModule("Module 01 — Story Foundation", [
        makeClass("01", "What Makes a Great Story", "25 min"),
        makeClass("02", "Finding Story Ideas", "30 min"),
        makeClass("03", "Story Theme & Message", "25 min"),
        makeClass("04", "Story Structure", "35 min"),
        makeClass("05", "Beginning, Middle & Ending", "30 min")
      ]),

      makeModule("Module 02 — Character Development", [
        makeClass("06", "Main Character Creation", "30 min"),
        makeClass("07", "Supporting Characters", "25 min"),
        makeClass("08", "Villain Creation", "30 min"),
        makeClass("09", "Character Motivation", "30 min"),
        makeClass("10", "Emotional Character Arc", "35 min")
      ]),

      makeModule("Module 03 — Conflict & Emotion", [
        makeClass("11", "Creating Conflict", "30 min"),
        makeClass("12", "Drama & Emotion", "35 min"),
        makeClass("13", "Suspense Building", "35 min"),
        makeClass("14", "Twists & Surprises", "35 min"),
        makeClass("15", "Moral & Emotional Ending", "30 min")
      ])
    ]
  },


  /* =======================================================
     11 — SCRIPT WRITING
     ======================================================= */

  {
    id: "script-writing",
    title: "Script Writing Masterclass",
    category: "YouTube & Story",
    icon: "📝",
    description:
      "Learn professional screenplay, dialogue, scene writing, narration and animation script development.",

    modules: [

      makeModule("Module 01 — Script Foundation", [
        makeClass("01", "Story to Script", "25 min"),
        makeClass("02", "Script Format", "25 min"),
        makeClass("03", "Scene Structure", "30 min"),
        makeClass("04", "Narration Writing", "30 min"),
        makeClass("05", "Dialogue Writing", "35 min")
      ]),

      makeModule("Module 02 — Character Dialogue", [
        makeClass("06", "Natural Dialogue", "30 min"),
        makeClass("07", "Character Voice", "30 min"),
        makeClass("08", "Emotional Dialogue", "35 min"),
        makeClass("09", "Argument & Conflict Dialogue", "30 min"),
        makeClass("10", "Dialogue for Cartoon Characters", "35 min")
      ]),

      makeModule("Module 03 — Animation Script", [
        makeClass("11", "Scene-by-Scene Breakdown", "35 min"),
        makeClass("12", "Action Description", "30 min"),
        makeClass("13", "Camera Direction", "30 min"),
        makeClass("14", "Sound & Music Direction", "25 min"),
        makeClass("15", "Complete Animation Script", "50 min")
      ])
    ]
  },


  /* =======================================================
     12 — COMPLETE STORY PRODUCTION
     ======================================================= */

  {
    id: "story-production",
    title: "Complete Story Production Masterclass",
    category: "YouTube & Story",
    icon: "🎬",
    description:
      "Learn the complete workflow from story idea to script, voice-over, assets, animation, editing and final YouTube publishing.",

    modules: [

      makeModule("Module 01 — Pre Production", [
        makeClass("01", "Story Idea", "20 min"),
        makeClass("02", "Story Development", "30 min"),
        makeClass("03", "Script Preparation", "35 min"),
        makeClass("04", "Production Planning", "30 min"),
        makeClass("05", "Storyboard Planning", "30 min")
      ]),

      makeModule("Module 02 — Asset Production", [
        makeClass("06", "Character Preparation", "30 min"),
        makeClass("07", "Background Preparation", "30 min"),
        makeClass("08", "Props & Assets", "25 min"),
        makeClass("09", "Voice Over Preparation", "30 min"),
        makeClass("10", "Asset Organization", "25 min")
      ]),

      makeModule("Module 03 — Animation Production", [
        makeClass("11", "Scene Setup", "35 min"),
        makeClass("12", "Character Animation", "45 min"),
        makeClass("13", "Facial Animation", "35 min"),
        makeClass("14", "Camera Animation", "35 min"),
        makeClass("15", "Complete Scene Animation", "50 min")
      ]),

      makeModule("Module 04 — Final Production", [
        makeClass("16", "Voice Synchronization", "30 min"),
        makeClass("17", "Sound Effects & Music", "30 min"),
        makeClass("18", "Video Editing", "40 min"),
        makeClass("19", "Final Quality Control", "30 min"),
        makeClass("20", "Complete Story Export", "45 min")
      ])
    ]
  },


  /* =======================================================
     13 — CHARACTER DESIGN
     ======================================================= */

  {
    id: "character-design",
    title: "Character Design Masterclass",
    category: "Animation",
    icon: "👤",
    description:
      "Learn professional cartoon character design for male, female, child and elderly characters.",

    modules: [

      makeModule("Module 01 — Character Design Foundation", [
        makeClass("01", "Character Design Fundamentals", "25 min"),
        makeClass("02", "Shape Language", "30 min"),
        makeClass("03", "Proportion & Anatomy", "35 min"),
        makeClass("04", "Face Structure", "30 min"),
        makeClass("05", "Character Personality", "30 min")
      ]),

      makeModule("Module 02 — Male Characters", [
        makeClass("06", "Male Face Design", "30 min"),
        makeClass("07", "Male Hair Design", "25 min"),
        makeClass("08", "Male Body Design", "35 min"),
        makeClass("09", "Male Clothing", "30 min"),
        makeClass("10", "Complete Male Character", "45 min")
      ]),

      makeModule("Module 03 — Female Characters", [
        makeClass("11", "Female Face Design", "30 min"),
        makeClass("12", "Hair & Hairstyle Design", "30 min"),
        makeClass("13", "Female Body Design", "35 min"),
        makeClass("14", "Saree & Traditional Clothing", "35 min"),
        makeClass("15", "Complete Female Character", "45 min")
      ]),

      makeModule("Module 04 — Family & Supporting Characters", [
        makeClass("16", "Child Character", "30 min"),
        makeClass("17", "Teen Character", "30 min"),
        makeClass("18", "Elderly Character", "35 min"),
        makeClass("19", "Village Character Design", "35 min"),
        makeClass("20", "Character Collection Project", "50 min")
      ])
    ]
  },


  /* =======================================================
     14 — AI VIDEO CREATION
     ======================================================= */

  {
    id: "ai-video",
    title: "AI Video Generation & AI Content Creation",
    category: "AI & Content Creation",
    icon: "🤖",
    description:
      "Learn AI-assisted story development, image generation, animation prompts, video generation and complete content workflows.",

    modules: [

      makeModule("Module 01 — AI Content Foundation", [
        makeClass("01", "Introduction to AI Content Creation", "25 min"),
        makeClass("02", "AI Tools & Workflow", "30 min"),
        makeClass("03", "Prompt Writing Fundamentals", "35 min"),
        makeClass("04", "Prompt Structure", "30 min"),
        makeClass("05", "Professional AI Workflow", "30 min")
      ]),

      makeModule("Module 02 — AI Image Creation", [
        makeClass("06", "AI Character Generation", "35 min"),
        makeClass("07", "AI Background Generation", "30 min"),
        makeClass("08", "Character Consistency", "40 min"),
        makeClass("09", "Style Consistency", "35 min"),
        makeClass("10", "AI Asset Production", "40 min")
      ]),

      makeModule("Module 03 — AI Video Generation", [
        makeClass("11", "Image-to-Video Workflow", "35 min"),
        makeClass("12", "Text-to-Video Workflow", "35 min"),
        makeClass("13", "Animation Prompt Writing", "40 min"),
        makeClass("14", "Camera Movement Prompts", "35 min"),
        makeClass("15", "Complete AI Video Project", "50 min")
      ])
    ]
  },


  /* =======================================================
     15 — BLENDER 3D
     ======================================================= */

  {
    id: "blender",
    title: "Blender 3D — Complete Beginner to Professional Course",
    category: "Animation",
    icon: "🧊",
    description:
      "Learn Blender 3D modeling, materials, lighting, animation, camera and rendering.",

    modules: [

      makeModule("Module 01 — Blender Foundation", [
        makeClass("01", "Blender Installation", "20 min"),
        makeClass("02", "Interface Overview", "30 min"),
        makeClass("03", "Navigation & Viewport", "25 min"),
        makeClass("04", "Objects & Transformations", "30 min"),
        makeClass("05", "Project Setup", "20 min")
      ]),

      makeModule("Module 02 — 3D Modeling", [
        makeClass("06", "Basic Modeling", "35 min"),
        makeClass("07", "Edit Mode", "30 min"),
        makeClass("08", "Modifiers", "35 min"),
        makeClass("09", "Character Modeling Basics", "45 min"),
        makeClass("10", "Complete Modeling Project", "60 min")
      ]),

      makeModule("Module 03 — Materials, Lighting & Rendering", [
        makeClass("11", "Materials", "30 min"),
        makeClass("12", "Textures", "35 min"),
        makeClass("13", "Lighting", "35 min"),
        makeClass("14", "Camera Setup", "30 min"),
        makeClass("15", "Final Rendering", "40 min")
      ])
    ]
  },


  /* =======================================================
     16 — AFTER EFFECTS
     ======================================================= */

  {
    id: "after-effects",
    title: "Adobe After Effects — Complete Motion Graphics Course",
    category: "Video Editing",
    icon: "✨",
    description:
      "Learn motion graphics, text animation, visual effects, compositing and professional animation.",

    modules: [

      makeModule("Module 01 — After Effects Foundation", [
        makeClass("01", "Installation & Setup", "20 min"),
        makeClass("02", "Interface Overview", "30 min"),
        makeClass("03", "Composition Setup", "25 min"),
        makeClass("04", "Layers & Timeline", "30 min"),
        makeClass("05", "Keyframe Basics", "30 min")
      ]),

      makeModule("Module 02 — Motion Graphics", [
        makeClass("06", "Position & Scale Animation", "30 min"),
        makeClass("07", "Rotation & Opacity", "25 min"),
        makeClass("08", "Text Animation", "35 min"),
        makeClass("09", "Shape Animation", "35 min"),
        makeClass("10", "Professional Motion Graphics", "45 min")
      ]),

      makeModule("Module 03 — Effects & Compositing", [
        makeClass("11", "Visual Effects", "35 min"),
        makeClass("12", "Green Screen", "30 min"),
        makeClass("13", "Masking & Rotoscoping", "40 min"),
        makeClass("14", "Compositing", "40 min"),
        makeClass("15", "Complete After Effects Project", "60 min")
      ])
    ]
  },


  /* =======================================================
     17 — YOUTUBE CHANNEL GROWTH
     ======================================================= */

  {
    id: "youtube-growth",
    title: "YouTube Channel Growth — Complete Masterclass",
    category: "YouTube & Story",
    icon: "▶️",
    description:
      "Learn YouTube channel setup, content strategy, thumbnails, titles, SEO, audience retention and growth.",

    modules: [

      makeModule("Module 01 — YouTube Foundation", [
        makeClass("01", "YouTube Channel Setup", "25 min"),
        makeClass("02", "Channel Branding", "30 min"),
        makeClass("03", "Niche Selection", "30 min"),
        makeClass("04", "Audience Research", "30 min"),
        makeClass("05", "Content Strategy", "35 min")
      ]),

      makeModule("Module 02 — Content Production", [
        makeClass("06", "Story Content Planning", "30 min"),
        makeClass("07", "Video Production Workflow", "35 min"),
        makeClass("08", "Voice Over & Narration", "30 min"),
        makeClass("09", "Thumbnail Creation", "35 min"),
        makeClass("10", "Video Quality Improvement", "30 min")
      ]),

      makeModule("Module 03 — YouTube SEO & Growth", [
        makeClass("11", "Video Title Strategy", "30 min"),
        makeClass("12", "Description & Keywords", "25 min"),
        makeClass("13", "YouTube Search SEO", "35 min"),
        makeClass("14", "Audience Retention", "35 min"),
        makeClass("15", "Analytics & Growth Strategy", "40 min")
      ]),

      makeModule("Module 04 — Professional Channel Strategy", [
        makeClass("16", "Content Calendar", "25 min"),
        makeClass("17", "Shorts Strategy", "30 min"),
        makeClass("18", "Long Video Strategy", "30 min"),
        makeClass("19", "Monetization Preparation", "30 min"),
        makeClass("20", "Complete Channel Growth Plan", "45 min")
      ])
    ]
  }

];


/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

window.MayaShadowAcademy = {
  courses: courses,

  version: "1.0",

  totalCourses: courses.length,

  getCourse: function(id) {
    return courses.find(function(course) {
      return course.id === id;
    });
  },

  getAllCourses: function() {
    return courses;
  },

  getCoursesByCategory: function(category) {
    return courses.filter(function(course) {
      return course.category === category;
    });
  }
};


/* =========================================================
   BACKWARD COMPATIBILITY
   ========================================================= */

window.courses = courses;

console.log(
  "Maya Shadow Academy Course Database Loaded:",
  courses.length,
  "courses"
);
console.log(
  "Maya Shadow Academy Course Database Loaded:",
  courses.length,
  "courses"
);

}
