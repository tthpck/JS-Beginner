const areaDatabase = {
  "Work & Career": [
    "Career Growth",
    "Deep Work & Focus",
    "Communication & Influence",
    "Leadership & Management",
    "Time & Priorities"
  ],

  "Fitness & Training": [
    "Fat Loss Essentials",
    "Strength & Muscle",
    "Energy & Recovery",
    "Mobility & Longevity",
    "Consistency & Habits"
  ],

  "Social & Relationships": [
    "Friendships",
    "Romantic Relationships",
    "Family Dynamics",
    "Networking & Social Skills",
    "Conflict Resolution"
  ],

  "Learning": [
    "Study Strategy",
    "Memory & Retention",
    "Skill Building",
    "Fast Learning Frameworks",
    "Focus & Anti-Procrastination"
  ],

  "Well-being": [
    "Stress & Anxiety",
    "Sleep Optimization",
    "Self-Care Basics",
    "Mental Resilience",
    "Emotional Regulation"
  ],

  "Productivity & Habits": [
    "Goal Setting",
    "Daily Systems",
    "Eliminating Distractions",
    "Habit Formation",
    "Planning & Execution"
  ],

  "Finances": [
    "Budgeting",
    "Saving Essentials",
    "Investing Foundations",
    "Debt Management",
    "Lifestyle Optimization"
  ],

  "Environment & Home": [
    "Home Organization",
    "Minimalism",
    "Cleaning Systems",
    "Digital Organization",
    "Life Logistics"
  ],

  "Self-Identity & Purpose": [
    "Values & Priorities",
    "Identity Growth",
    "Confidence & Self-Talk",
    "Long-Term Vision",
    "Life Direction"
  ]
};


const actionsDatabase = {

  "Work & Career": {

    "Career Growth": [
      "Identify one high-ROI skill and practice 20 min/day",
      "Schedule a weekly review to adjust direction",
      "Ask for feedback from one key person"
    ],

    "Deep Work & Focus": [
      "Do 90 minutes of deep work before noon",
      "Eliminate your single biggest distraction",
      "Define your 3 priority tasks for the day"
    ],

    "Communication & Influence": [
      "Write one clear message per day",
      "Use active listening in one conversation",
      "Record yourself speaking for 2 min"
    ],

    "Leadership & Management": [
      "Delegate one task today",
      "Run a 10-min alignment check",
      "Clarify responsibilities for one person"
    ],

    "Time & Priorities": [
      "Plan the day with a 3-task priority system",
      "Batch similar tasks together",
      "Do your highest-impact task first"
    ]
  },

  "Fitness & Training": {

    "Fat Loss Essentials": [
      "Walk 8–10k steps daily",
      "Eat protein at every meal",
      "Avoid liquid calories"
    ],

    "Strength & Muscle": [
      "Use 3 compound exercises per workout",
      "Increase weight or reps weekly",
      "Train 3× per week consistently"
    ],

    "Energy & Recovery": [
      "Sleep 7.5–8 hours",
      "Drink 2 liters of water",
      "Take a 15-minute walk after meals"
    ],

    "Mobility & Longevity": [
      "Stretch 5–10 minutes daily",
      "Do 3 mobility drills",
      "Sit less than 45 minutes at a time"
    ],

    "Consistency & Habits": [
      "Set workouts on a fixed weekly schedule",
      "Track workouts with a simple log",
      "Prepare clothes the night before"
    ]
  },

  "Social & Relationships": {

    "Friendships": [
      "Message one friend per day",
      "Schedule a weekly catch-up",
      "Share one positive thought"
    ],

    "Romantic Relationships": [
      "Give one genuine compliment today",
      "Plan a weekly shared moment",
      "Use 'I feel' statements in conflict"
    ],

    "Family Dynamics": [
      "Call one family member",
      "Express appreciation once today",
      "Set one healthy boundary"
    ],

    "Networking & Social Skills": [
      "Send one reach-out message",
      "Ask one good question",
      "Listen more than you talk"
    ],

    "Conflict Resolution": [
      "Pause 5 seconds before reacting",
      "Clarify the other person's view",
      "Focus on solutions, not blame"
    ]
  },

  "Learning": {

    "Study Strategy": [
      "Use Pomodoro (25/5)",
      "Summarize in 3 sentences",
      "Review after 24 hours"
    ],

    "Memory & Retention": [
      "Use spaced repetition 10 min",
      "Teach the concept to someone",
      "Use active recall"
    ],

    "Skill Building": [
      "Practice 20 minutes/day",
      "Follow one course at a time",
      "Track progress weekly"
    ],

    "Fast Learning Frameworks": [
      "Identify the core 20% to focus on",
      "Define your end goal in 1 line",
      "Learn by doing, not consuming"
    ],

    "Focus & Anti-Procrastination": [
      "Turn off notifications 2h",
      "Start with a 2-minute entry",
      "Set a 10-minute timer to begin"
    ]
  },

  "Well-being": {

    "Stress & Anxiety": [
      "Do 2 minutes of deep breathing",
      "Take a 10-minute walk",
      "Write your top worry"
    ],

    "Sleep Optimization": [
      "Avoid screens 1h before bed",
      "Go to bed at the same time",
      "Keep your room cool and dark"
    ],

    "Self-Care Basics": [
      "Drink water in the morning",
      "Take a 10-minute break",
      "Do one small action for your body"
    ],

    "Mental Resilience": [
      "Write one challenge overcome",
      "Reframe one negative thought",
      "Do something slightly uncomfortable"
    ],

    "Emotional Regulation": [
      "Label what you feel",
      "Pause before reacting",
      "Take 3 slow breaths"
    ]
  },

  "Productivity & Habits": {

    "Goal Setting": [
      "Write a single daily goal",
      "Define the next small step",
      "Review weekly progress"
    ],

    "Daily Systems": [
      "Plan tomorrow before bed",
      "Keep a simple to-do list",
      "Follow a morning routine"
    ],

    "Eliminating Distractions": [
      "Turn off all non-essential notifications",
      "Keep your phone in another room 1h",
      "Close unnecessary tabs"
    ],

    "Habit Formation": [
      "Start with 2-minute habits",
      "Attach to an existing routine",
      "Track streaks visually"
    ],

    "Planning & Execution": [
      "Break tasks into tiny steps",
      "Set a 30-minute work timer",
      "Focus on ONE task at a time"
    ]
  },

  "Finances": {

    "Budgeting": [
      "Track expenses 2 min/day",
      "Set a weekly spend limit",
      "Identify top 3 categories"
    ],

    "Saving Essentials": [
      "Automate a monthly transfer",
      "Save the first 10% of income",
      "Avoid impulse buys 24h"
    ],

    "Investing Foundations": [
      "Invest a fixed monthly amount",
      "Use index funds/ETFs",
      "Avoid timing the market"
    ],

    "Debt Management": [
      "Pay minimum + extra on one debt",
      "List debts smallest → largest",
      "Avoid new credit 30 days"
    ],

    "Lifestyle Optimization": [
      "Cancel 1 unused subscription",
      "Buy quality once",
      "Cook at home once more/week"
    ]
  },

  "Environment & Home": {

    "Home Organization": [
      "Declutter one drawer",
      "Set a 10-minute tidy timer",
      "Give each item a place"
    ],

    "Minimalism": [
      "Remove 3 items today",
      "Stop buying duplicates",
      "Ask 'Do I need this?'"
    ],

    "Cleaning Systems": [
      "Clean one area 5 min/day",
      "Create a weekly cleaning plan",
      "Do a night reset"
    ],

    "Digital Organization": [
      "Delete old files/photos",
      "Organize desktop",
      "Unsubscribe from 5 emails"
    ],

    "Life Logistics": [
      "Set reminders",
      "Keep essentials in fixed spots",
      "Track recurring tasks monthly"
    ]
  },

  "Self-Identity & Purpose": {

    "Values & Priorities": [
      "List your top 3 values",
      "Match actions to values",
      "Say no to one thing"
    ],

    "Identity Growth": [
      "Act like your future self once",
      "Shift one limiting belief",
      "Choose one upgrade today"
    ],

    "Confidence & Self-Talk": [
      "Replace one negative thought",
      "Use open posture",
      "Do one bold action"
    ],

    "Long-Term Vision": [
      "Write a 1-year vision",
      "Define direction, not plan",
      "Set one monthly priority"
    ],

    "Life Direction": [
      "Choose one weekly focus area",
      "Eliminate one low-value task",
      "Ask: 'Is this aligned?'"
    ]
  }

};
