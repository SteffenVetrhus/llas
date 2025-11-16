export const courseData = {
  "course": {
    "title": "Spanish from Scratch: The 10-Week Mission",
    "language": "es",
    "level": "A1 (Beginner)",
    "totalWeeks": 10,
    "weeks": [
      {
        "weekNumber": 1,
        "title": "First Contact",
        "mission": "Successfully introduce yourself to a new person, ask their name, and say where you are from.",
        "keyConcepts": ["Greetings", "Introductions", "Subject Pronouns", "The verb 'ser' (to be)", "Gendered Nouns", "The Alphabet"],
        "modules": [
          {
            "moduleId": "W1M1",
            "title": "The Mission: A New Friend",
            "type": "comprehensibleInput",
            "content": {
              "dialogue": [
                {"speaker": "Ana", "line": "¡Hola! Me llamo Ana. ¿Cómo te llamas?"},
                {"speaker": "David", "line": "Hola, Ana. Me llamo David. Mucho gusto."},
                {"speaker": "Ana", "line": "Igualmente. Yo soy de México. ¿De dónde eres tú?"},
                {"speaker": "David", "line": "Soy de Canadá. ¿Y tú?"},
                {"speaker": "Ana", "line": "¡Ah, de México! Bienvenida."}
              ],
              "translation": [
                {"speaker": "Ana", "line": "Hi! My name is Ana. What's your name?"},
                {"speaker": "David", "line": "Hi, Ana. My name is David. Nice to meet you."},
                {"speaker": "Ana", "line": "Likewise. I am from Mexico. Where are you from?"},
                {"speaker": "David", "line": "I'm from Canada. And you?"},
                {"speaker": "Ana", "line": "Ah, from Mexico! Welcome."}
              ]
            }
          },
          {
            "moduleId": "W1M2",
            "title": "Key Vocabulary: Greetings",
            "type": "vocabulary",
            "content": [
              {"term": "Hola", "translation": "Hello", "audioUrl": "/audio/es/hola.mp3"},
              {"term": "Adiós", "translation": "Goodbye", "audioUrl": "/audio/es/adios.mp3"},
              {"term": "Buenos días", "translation": "Good morning", "audioUrl": "/audio/es/buenos_dias.mp3"},
              {"term": "Buenas tardes", "translation": "Good afternoon", "audioUrl": "/audio/es/buenas_tardes.mp3"},
              {"term": "Buenas noches", "translation": "Good night", "audioUrl": "/audio/es/buenas_noches.mp3"},
              {"term": "¿Cómo te llamas?", "translation": "What is your name?", "audioUrl": "/audio/es/como_te_llamas.mp3"},
              {"term": "Me llamo...", "translation": "My name is...", "audioUrl": "/audio/es/me_llamo.mp3"},
              {"term": "Mucho gusto", "translation": "Nice to meet you", "audioUrl": "/audio/es/mucho_gusto.mp3"},
              {"term": "Igualmente", "translation": "Likewise", "audioUrl": "/audio/es/igualmente.mp3"}
            ]
          },
          {
            "moduleId": "W1M3",
            "title": "Grammar Tool: The Verb 'Ser' (To Be)",
            "type": "grammar",
            "content": {
              "explanation": "To complete your mission, you need the verb 'ser'. We use 'ser' to talk about permanent identities, like your name or where you're from. It's your 'identity' verb.",
              "conjugation": {
                "yo": "soy",
                "tú": "eres",
                "él/ella/usted": "es",
                "nosotros": "somos",
                "vosotros": "sois",
                "ellos/ellas/ustedes": "son"
              },
              "examples": [
                {"es": "Yo soy David.", "en": "I am David."},
                {"es": "Tú eres de Canadá.", "en": "You are from Canada."},
                {"es": "Ana es de México.", "en": "Ana is from Mexico."}
              ]
            }
          },
          {
            "moduleId": "W1M4",
            "title": "Grammar Tool: Nouns & Gender",
            "type": "grammar",
            "content": {
              "explanation": "In Spanish, all nouns have a gender, either 'masculine' (often ending in -o) or 'feminine' (often ending in -a). This affects the articles (like 'the' and 'a') we use. For now, just be aware of it.",
              "examples": [
                {"es": "el chico", "en": "the boy (masculine)"},
                {"es": "la chica", "en": "the girl (feminine)"},
                {"es": "un amigo", "en": "a friend (male)"},
                {"es": "una amiga", "en": "a friend (female)"}
              ]
            }
          },
          {
            "moduleId": "W1M5",
            "title": "Culture Byte: 'Tú' vs. 'Usted'",
            "type": "culture",
            "content": {
              "snippet": "You heard Ana use 'tú' with David. 'Tú' is the informal 'you,' used with friends, family, and people your age. 'Usted' is the formal 'you,' used to show respect (to a boss, an elder, or a stranger in a formal setting). For this course, we'll practice with 'tú'!",
              "imageUrl": "/images/culture/tu_vs_usted.jpg"
            }
          },
          {
            "moduleId": "W1M6",
            "title": "Practice: Speech Lab",
            "type": "practice",
            "content": {
              "prompt": "Let's practice your mission phrases. Record yourself saying the following:",
              "phrases": [
                "¿Cómo te llamas?",
                "Me llamo...",
                "¿De dónde eres?",
                "Soy de..."
              ],
              "feedbackEngine": "ai_pronunciation_grader"
            }
          },
          {
            "moduleId": "W1M7",
            "title": "Mission Debrief: The Quiz",
            "type": "quiz",
            "content": {
              "questions": [
                {
                  "questionId": "W1Q1",
                  "type": "fillInBlank",
                  "prompt": "Complete the dialogue: 'Hola, ¿cómo te llamas?' '___ llamo Carlos.'",
                  "correctAnswer": "Me",
                  "feedback": "¡Perfecto! 'Me llamo' literally means 'I call myself' and is how you introduce your name."
                },
                {
                  "questionId": "W1Q2",
                  "type": "multipleChoice",
                  "prompt": "How do you ask 'Where are you from?'",
                  "options": [
                    "¿Cómo te llamas?",
                    "¿De dónde eres?",
                    "¿Cómo estás?",
                    "Mucho gusto."
                  ],
                  "correctAnswer": "¿De dónde eres?",
                  "feedback": "¡Excelente! '¿De dónde...?' means 'From where...?' and 'eres' is the 'tú' (you) form of 'ser'."
                },
                {
                  "questionId": "W1Q3",
                  "type": "fillInBlank",
                  "prompt": "Complete the sentence using 'ser': 'Yo ___ de los Estados Unidos.'",
                  "correctAnswer": "soy",
                  "feedback": "Correct! For 'yo' (I), the 'ser' verb is 'soy'. 'Yo soy' = 'I am'."
                },
                {
                  "questionId": "W1C1",
                  "type": "scenario",
                  "prompt": "A new colleague approaches you. They say: 'Hola, me llamo Sofia. Mucho gusto.' What is the BEST response to introduce yourself?",
                  "options": [
                    "Adiós, Sofia.",
                    "¿De dónde eres?",
                    "Hola, Sofia. Me llamo [Your Name]. Igualmente.",
                    "Yo soy [Your Name]. Buenas noches."
                  ],
                  "correctAnswer": "Hola, Sofia. Me llamo [Your Name]. Igualmente.",
                  "feedback": "This is the perfect response! You return the greeting, give your name, and say 'Likewise' ('Igualmente') for 'Nice to meet you.'"
                }
              ]
            }
          }
        ]
      },
      {
        "weekNumber": 2,
        "title": "Mapping Your World",
        "mission": "Successfully describe what is in your room and ask where the bathroom is.",
        "keyConcepts": ["The verb 'estar' (to be, for location)", "The verb 'hay' (there is/are)", "Definite Articles (el, la, los, las)", "Prepositions of place (en, al lado de, etc.)", "Household vocabulary"],
        "modules": []
      },
      {
        "weekNumber": 3,
        "title": "The Daily Routine",
        "mission": "Explain your simple daily routine (e.g., 'I wake up, I have coffee, I work.') to a new friend.",
        "keyConcepts": ["Regular '-ar' verbs", "Present tense conjugation", "The verb 'tener' (to have)", "Telling time", "Reflexive verbs (me levanto, me ducho)"],
        "modules": []
      },
      {
        "weekNumber": 4,
        "title": "The Café",
        "mission": "Successfully order a specific coffee and pastry in a simulated café dialogue.",
        "keyConcepts": ["Regular '-er' and '-ir' verbs", "Food & drink vocabulary", "Numbers 1-100", "The verb 'querer' (to want)", "Polite phrases"],
        "modules": []
      },
      {
        "weekNumber": 5,
        "title": "Making Plans",
        "mission": "Invite a friend to do something on a specific day and at a specific time.",
        "keyConcepts": ["The verb 'ir' (to go)", "The structure 'ir a + infinitive' (going to...)", "Days of the week", "Months", "Question words (dónde, cuándo, qué)"],
        "modules": []
      },
      {
        "weekNumber": 6,
        "title": "Likes & Dislikes",
        "mission": "Explain your top three hobbies and ask someone about their preferences in music.",
        "keyConcepts": ["The verb 'gustar' (to like)", "Indirect Object Pronouns (me, te, le)", "Verbs like 'gustar' (encantar, interesar)", "Hobby & leisure vocabulary"],
        "modules": []
      },
      {
        "weekNumber": 7,
        "title": "The 'Super Verbs'",
        "mission": "Ask someone if you can do something (e.g., 'Can I open the window?') and explain what you can/can't do.",
        "keyConcepts": ["Stem-changing verbs (e.g., 'poder', 'querer', 'jugar', 'dormir')", "The structure 'poder + infinitive' (can...)", "The structure 'tener que + infinitive' (have to...)"],
        "modules": []
      },
      {
        "weekNumber": 8,
        "title": "What's Happening?",
        "mission": "Write a short message to a friend describing what you and other people are doing right now.",
        "keyConcepts": ["Present Progressive tense ('estar + -ando/-iendo')", "Gerunds", "Verbs of action", "Weather expressions ('Está lloviendo')"],
        "modules": []
      },
      {
        "weekNumber": 9,
        "title": "A Trip to the Market",
        "mission": "Talk about what you bought at the market yesterday.",
        "keyConcepts": ["The Preterite Tense (Simple Past)", "Preterite of regular '-ar' verbs", "Preterite of 'ser' and 'ir' (fui)", "Past time markers (ayer, anoche)"],
        "modules": []
      },
      {
        "weekNumber": 10,
        "title": "The Story",
        "mission": "Tell a short, simple story about what you did last weekend.",
        "keyConcepts": ["Preterite of regular '-er' and '-ir' verbs", "Key irregular preterites ('hacer' -> hice, 'tener' -> tuve, 'ver' -> vi)", "Storytelling connectors (primero, luego, después, al final)"],
        "modules": []
      }
    ]
  }
};
