export interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  explanation?: string;
}

export interface LessonSection {
  type: "text" | "flashcard" | "example" | "tip" | "table";
  title?: string;
  content?: string;
  cards?: { front: string; back: string }[];
  rows?: string[][];
  headers?: string[];
  items?: { label: string; value: string }[];
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  duration: string; // e.g. "5 min"
  sections: LessonSection[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  questions: Question[];
}

export const topics: Topic[] = [
  // ── MATHEMATICS ─────────────────────────────────────────────────────
  {
    id: "math",
    title: "Mathematics",
    description: "Word problems, operations & data sufficiency",
    icon: "🔢",
    color: "#2563eb",
    lessons: [
      {
        id: "math-operations",
        title: "Operations & Number Properties",
        emoji: "➗",
        duration: "7 min",
        sections: [
          {
            type: "text",
            title: "Order of Operations (PEMDAS)",
            content: "Solve expressions in this exact order: **Parentheses** first, then **Exponents**, then **Multiplication & Division** left to right, then **Addition & Subtraction** left to right. Never skip steps!"
          },
          {
            type: "example",
            title: "Try this: 16 ÷ (24 ÷ 8) + 22 × 8 − 8",
            items: [
              { label: "Step 1 — Parentheses", value: "24 ÷ 8 = 3 → so 16 ÷ 3 + 22 × 8 − 8" },
              { label: "Step 2 — Division", value: "16 ÷ 3 ≈ 5.33" },
              { label: "Step 3 — Multiplication", value: "22 × 8 = 176" },
              { label: "Step 4 — Add/Subtract", value: "5.33 + 176 − 8 = 173.33" },
            ]
          },
          {
            type: "tip",
            content: "When dividing, check remainders! 192,888 ÷ 8 → last 3 digits are 888 → 888 ÷ 8 = 111 exactly → remainder is **0**."
          },
          {
            type: "flashcard",
            title: "Divisibility Rules — Tap to reveal",
            cards: [
              { front: "Divisible by 2?", back: "Last digit is even (0, 2, 4, 6, 8)" },
              { front: "Divisible by 3?", back: "Sum of digits divisible by 3. Example: 123 → 1+2+3=6 ✓" },
              { front: "Divisible by 4?", back: "Last TWO digits divisible by 4. Example: 9,208 → 08÷4=2 ✓" },
              { front: "Divisible by 5?", back: "Last digit is 0 or 5" },
              { front: "Divisible by 8?", back: "Last THREE digits divisible by 8. Example: 9,208 → 208÷8=26 ✓" },
              { front: "Divisible by 10?", back: "Last digit is 0" },
            ]
          },
          {
            type: "table",
            title: "Number Properties",
            headers: ["Property", "Rule", "Example"],
            rows: [
              ["Commutative", "a + b = b + a", "3 + 5 = 5 + 3"],
              ["Associative", "(a+b)+c = a+(b+c)", "(2+3)+4 = 2+(3+4)"],
              ["Distributive", "a(b+c) = ab + ac", "3(4+5) = 12+15 = 27"],
              ["Transitive", "If a=b and b=c, then a=c", "If x=5 and 5=y, then x=y"],
            ]
          },
          {
            type: "tip",
            content: "**Rounding trick:** To round 299,943 to the nearest thousand — look at the hundreds digit (9). Since 9 ≥ 5, round UP → **300,000**."
          }
        ]
      },
      {
        id: "math-fractions",
        title: "Fractions, Decimals & Percentages",
        emoji: "%",
        duration: "8 min",
        sections: [
          {
            type: "text",
            title: "The 3 Percentage Formulas",
            content: "Every percentage problem is one of three types. Master these and you can solve any %  question."
          },
          {
            type: "example",
            title: "The 3 Essential Formulas",
            items: [
              { label: "P% of N = ?", value: "(P ÷ 100) × N → e.g. 25% of 228 = 0.25 × 228 = **57**" },
              { label: "N is P% of what?", value: "N ÷ (P÷100) → e.g. 228 is 25% of 228÷0.25 = **912**" },
              { label: "N is what % of M?", value: "(N÷M) × 100 → e.g. 168 is what % of 672? = **25%**" },
            ]
          },
          {
            type: "tip",
            content: "**Watch out!** Successive % changes are NOT additive. Php750 decreased by 10% = 675, then increased by 10% = **742.50**, NOT 750!"
          },
          {
            type: "flashcard",
            title: "Fraction Conversions — Tap to reveal",
            cards: [
              { front: "How to reduce 231/1001?", back: "Find GCF → GCF(231,1001) = 77 → 231÷77 = 3, 1001÷77 = 13 → Answer: **3/13**" },
              { front: "What is 3¼ of 16?", back: "Convert: 3¼ = 13/4 → (13/4) × 16 = 52" },
              { front: "1 + ½ + ¼ + ⅛ = ?", back: "Common denominator 8: 8/8 + 4/8 + 2/8 + 1/8 = **15/8 = 1⁷/₈**" },
              { front: "% Increase formula?", back: "(New − Old) ÷ Old × 100 → e.g. 15,000→18,000 = 3000÷15000×100 = **20%**" },
              { front: "% Decrease formula?", back: "(Old − New) ÷ Old × 100 → e.g. 750→675 = 75÷750×100 = **10%**" },
            ]
          },
          {
            type: "example",
            title: "Markup & Discount (Business Math)",
            items: [
              { label: "Sale price of TV is ₱7,200 at 40% discount", value: "Regular = Sale ÷ (1 − 0.40) = 7200 ÷ 0.60 = **₱12,000**" },
              { label: "Starting salary ₱15,000 raised to ₱18,000", value: "Rate = (18000−15000) ÷ 15000 × 100 = **20%** increase" },
              { label: "Lot cost ₱12,500 five years ago, 420% increase", value: "New = 12500 × (1 + 4.20) = 12500 × 5.20 = **₱65,000**" },
            ]
          }
        ]
      },
      {
        id: "math-wordproblems",
        title: "Word Problems & Applications",
        emoji: "📐",
        duration: "10 min",
        sections: [
          {
            type: "text",
            title: "Reading Word Problems",
            content: "Always identify: **What is given?** and **What is being asked?** Then set up an equation. Assign variables to unknowns."
          },
          {
            type: "flashcard",
            title: "Problem Type Formulas — Tap to reveal",
            cards: [
              { front: "Distance problems", back: "Distance = Rate × Time → d = rt. If rate = 132⅝ km/h for 2½ hrs → 132.625 × 2.5 = **331 9/16 km**" },
              { front: "Age problems", back: "Paula = 2×Queenie. 7 years ago sum = 16 → 3Q−14=16 → Q=10. **Queenie is 10**" },
              { front: "Simple Interest", back: "I = P × r × t. Rate = I ÷ P. If ₱750,000 earns ₱90,000 interest → r = 90000÷750000 = **12%**" },
              { front: "Work problems (unit price)", back: "Brand A: ₱87.50 ÷ 1.25kg = ₱70/kg. Brand B: ₱103.20 ÷ 1.5kg = ₱68.80/kg → B is cheaper by **₱1.20**" },
              { front: "Rectangle perimeter", back: "P = 2(l+w). If P=112m, l=2w+8 → 2(2w+8+w)=112 → w=16, l=40 → Area=**640m²**" },
              { front: "Commission", back: "Commission = Sale Price × Rate. If rate = 8%, selling price = ₱9.2M ÷ 0.92 = **₱10M**" },
            ]
          },
          {
            type: "example",
            title: "House & Lot Problem (Classic CSC Type)",
            items: [
              { label: "Given", value: "House + lot sold for ₱14M. House costs 1.5× the lot." },
              { label: "Set up", value: "Let lot = x, house = 1.5x → x + 1.5x = 14M → 2.5x = 14M" },
              { label: "Answer", value: "x = 14M ÷ 2.5 = **₱5.6M** (lot), house = **₱8.4M**" },
            ]
          },
          {
            type: "tip",
            content: "**Electricity bills:** 10 bulbs × 100W × 5hrs = 5,000Wh = **5 kWh**. Multiply kWh by the rate to get cost."
          }
        ]
      },
      {
        id: "math-datasufficiency",
        title: "Data Sufficiency",
        emoji: "🧮",
        duration: "6 min",
        sections: [
          {
            type: "text",
            title: "What is Data Sufficiency?",
            content: "You're given a **question** and two **statements**. You must decide if the statements give enough info to answer — you do NOT need to solve it, just determine IF it CAN be solved."
          },
          {
            type: "table",
            title: "The 5 Answer Choices (Always the same!)",
            headers: ["Choice", "Meaning"],
            rows: [
              ["A", "Statement (1) ALONE is sufficient, (2) alone is not"],
              ["B", "Statement (2) ALONE is sufficient, (1) alone is not"],
              ["C", "BOTH together are sufficient, neither alone is"],
              ["D", "EACH statement ALONE is sufficient"],
              ["E", "Statements (1) and (2) TOGETHER are NOT sufficient"],
            ]
          },
          {
            type: "example",
            title: "Worked Example",
            items: [
              { label: "Question", value: "By what % was the price per kilo of chicken increased?" },
              { label: "Statement 1", value: "Increased by ₱20 → We don't know original price → NOT sufficient alone" },
              { label: "Statement 2", value: "Increased by ₱120 → Ambiguous (is ₱120 the original or new price?) → NOT sufficient alone" },
              { label: "Both together", value: "Original = ₱120, increase = ₱20 → % = 20÷120 × 100 = 16.67% → SUFFICIENT" },
              { label: "Answer", value: "**C** — Both together are sufficient" },
            ]
          },
          {
            type: "flashcard",
            title: "Data Sufficiency Strategy",
            cards: [
              { front: "Step 1", back: "Try Statement 1 ALONE — does it give ONE definite answer?" },
              { front: "Step 2", back: "Try Statement 2 ALONE — does it give ONE definite answer?" },
              { front: "Step 3", back: "If both fail alone — try them TOGETHER. Still not enough? Answer is E." },
              { front: "Key trap!", back: "A statement is sufficient only if it gives EXACTLY ONE answer, not multiple possibilities." },
            ]
          }
        ]
      },
    ],
    questions: [
      { id: 1, question: "If 1+2+3+...+10 = 55, then 11+12+13+...+20 = ?", choices: ["65","155","125","550"], answer: 1, explanation: "Each term is 10 more than its counterpart, so add 10×10 = 100 to 55. 55+100=155." },
      { id: 2, question: "Find the product: 800 × 125", choices: ["925","1,000","10,000","100,000"], answer: 3 },
      { id: 3, question: "Find the quotient: 8,000 ÷ 125", choices: ["48","64","80","88"], answer: 1 },
      { id: 4, question: "Find the sum: 299 + 943 + 398 + 101", choices: ["1,531","1,641","1,741","122,222"], answer: 2 },
      { id: 5, question: "What is the remainder when 192,888 is divided by 8?", choices: ["0","4","8","24,111"], answer: 0, explanation: "Last 3 digits: 888 ÷ 8 = 111 exactly → remainder is 0." },
      { id: 6, question: "Rounding 299,943 to the nearest thousands gives:", choices: ["299,940","299,000","299,900","300,000"], answer: 3, explanation: "Hundreds digit is 9 (≥5), so round up → 300,000." },
      { id: 7, question: "Which number is divisible by 8?", choices: ["9,208","6,236","88,254","8,886"], answer: 0, explanation: "Last 3 digits of 9,208 = 208. 208 ÷ 8 = 26 exactly." },
      { id: 8, question: "25% of 228 = ?", choices: ["52","57","54","912"], answer: 1, explanation: "0.25 × 228 = 57" },
      { id: 9, question: "228 is 25% of what number?", choices: ["52","57","54","912"], answer: 3, explanation: "228 ÷ 0.25 = 912" },
      { id: 10, question: "168 is what percent of 672?", choices: ["25%","50%","400%","80%"], answer: 0, explanation: "(168÷672) × 100 = 25%" },
      { id: 11, question: "If 8x + 12 = 24, what is the value of 24x + 36?", choices: ["4","6","8","72"], answer: 3, explanation: "24x+36 = 3(8x+12) = 3×24 = 72" },
      { id: 12, question: "The difference between 8 times a number and 17 is 231. Find the number.", choices: ["31","37","48","1,984"], answer: 0, explanation: "8n−17=231 → 8n=248 → n=31" },
      { id: 13, question: "Reduce 231/1001 to its lowest terms.", choices: ["7/11","3/31","3/13","7/13"], answer: 2, explanation: "GCF(231,1001)=77 → 231÷77=3, 1001÷77=13 → 3/13" },
      { id: 14, question: "Paula is twice as old as Queenie. 7 years ago the sum of their ages was 16. How old is Queenie now?", choices: ["8","10","16","20"], answer: 1, explanation: "P=2Q. (Q-7)+(2Q-7)=16 → 3Q=30 → Q=10" },
      { id: 15, question: "The sale price of a TV is ₱7,200 at a 40% discount. What is the regular price?", choices: ["₱4,320","₱12,000","₱6,800","₱10,000"], answer: 1, explanation: "7200 ÷ 0.60 = ₱12,000" },
      { id: 16, question: "A starting salary of ₱15,000 will be raised to ₱18,000. What is the rate of increase?", choices: ["3%","20%","25%","30%"], answer: 1, explanation: "(18000-15000)÷15000 × 100 = 20%" },
      { id: 17, question: "Mr. Cruz borrows ₱750,000 and pays ₱90,000 interest. What rate did the bank charge?", choices: ["8%","9%","10%","12%"], answer: 3, explanation: "90000÷750000 = 0.12 = 12%" },
      { id: 18, question: "A race car traveled 2½ hours at 132⁵⁄₈ km/h. Find the total distance.", choices: ["264 5/16 km","331 9/16 km","330 5/16 km","135 1/8 km"], answer: 1, explanation: "132.625 × 2.5 = 331.5625 = 331 9/16 km" },
      { id: 19, question: "₱750 decreased by 10%, then increased by 10%. What is the final price?", choices: ["₱742.50","₱750.00","₱675.00","₱825.00"], answer: 0, explanation: "750×0.9=675, 675×1.1=742.50 (not 750!)" },
      { id: 20, question: "560 out of 700 examinees passed the Career Service exam. What percent passed?", choices: ["65%","72%","80%","140%"], answer: 2, explanation: "(560÷700)×100 = 80%" },
      { id: 21, question: "Data Sufficiency: By what percent was chicken price increased? (1) increased by ₱20; (2) original price was ₱120", choices: ["Statement 1 alone","Statement 2 alone","Both together","Each alone"], answer: 2, explanation: "Need both: ₱20÷₱120 × 100 = 16.67%" },
      { id: 22, question: "Data Sufficiency: What is 24% of x? (1) 16 is 8% of x; (2) ⅛ of x is 1,600", choices: ["Statement 1 alone","Statement 2 alone","Both together","Each alone"], answer: 3, explanation: "Stmt 1: x=200; Stmt 2: x=12,800. Each independently gives a value of x." },
    ]
  },

  // ── ENGLISH ─────────────────────────────────────────────────────────
  {
    id: "english",
    title: "English",
    description: "Vocabulary, analogies, grammar & reading",
    icon: "📖",
    color: "#7c3aed",
    lessons: [
      {
        id: "eng-alphabetizing",
        title: "Alphabetizing & Clerical Operations",
        emoji: "🔤",
        duration: "5 min",
        sections: [
          {
            type: "text",
            title: "Rules for Alphabetizing",
            content: "Alphabetize **word by word, letter by letter**. A space comes BEFORE any letter. Compare character by character from left to right. For names: Last Name → First Name → Middle."
          },
          {
            type: "example",
            title: "Government Agency Example",
            items: [
              { label: "Given agencies", value: "A. Commission on the Filipino Language · B. Commission on Human Rights · C. Commission on Higher Education · D. Commission on Population" },
              { label: "All start with 'Commission on'", value: "Compare the next word: Filipino, Human, Higher, Population" },
              { label: "Sort: F < Hi < Hu < P", value: "Filipino → Higher → Human → Population" },
              { label: "Answer", value: "**C (Higher), A (Filipino)... wait: F < Hi < Hu < P → A, C, B, D**" },
            ]
          },
          {
            type: "flashcard",
            title: "Alphabetizing Traps — Tap to reveal",
            cards: [
              { front: "Commission on Higher vs Human?", back: "Both start 'H' — compare next: Hi < Hu → Higher comes first" },
              { front: "Santos, Ana vs Santos, Anita?", back: "Compare after 'Santos, An': a < ita → Ana comes before Anita" },
              { front: "Santos, Anthony vs Santos, Antonio?", back: "Compare after 'Santos, Anton': h < i → Anthony before Antonio" },
              { front: "Bureau of Fisheries vs Bureau of Internal?", back: "F < I → Fisheries comes first" },
              { front: "'The' at the start of a name?", back: "Ignore 'The' — alphabetize by the next word" },
            ]
          }
        ]
      },
      {
        id: "eng-vocab",
        title: "Synonyms & Antonyms",
        emoji: "💬",
        duration: "8 min",
        sections: [
          {
            type: "text",
            title: "Strategy for Vocabulary Questions",
            content: "Read the full sentence — context often reveals the meaning. Eliminate obvious wrong answers. If unfamiliar, look for roots: **apath-** (without feeling), **omni-** (all), **meticul-** (careful)."
          },
          {
            type: "flashcard",
            title: "Key Synonyms (CSC Favorites) — Tap to reveal",
            cards: [
              { front: "apathetic", back: "**indifferent** — showing no interest or concern" },
              { front: "cognizant", back: "**aware** — having knowledge of something" },
              { front: "disparaging", back: "**damaging/derogatory** — expressing disrespect" },
              { front: "ephemeral", back: "**short-lived** — lasting only a short time" },
              { front: "fastidious", back: "**choosy/picky** — very attentive to detail" },
              { front: "haughty", back: "**arrogant** — having an exaggerated sense of superiority" },
              { front: "impudent", back: "**rude** — not showing due respect" },
              { front: "irascible", back: "**hot-tempered** — easily made angry" },
              { front: "meticulous", back: "**careful** — showing great attention to detail" },
              { front: "myopic", back: "**nearsighted** — unable to see far" },
              { front: "omniscient", back: "**all-knowing** — knowing everything" },
              { front: "prudent", back: "**wise** — acting with care and thought" },
              { front: "veracity", back: "**truthfulness/accuracy**" },
              { front: "insidious", back: "**treacherous** — proceeding harmfully in a subtle way" },
              { front: "mundane", back: "**worldly/ordinary** — lacking interest or excitement" },
            ]
          },
          {
            type: "flashcard",
            title: "Key Antonyms (Opposites) — Tap to reveal",
            cards: [
              { front: "Opposite of brusque?", back: "**refined** — brusque means abrupt/rude" },
              { front: "Opposite of candid?", back: "**reserved** — candid means frank/open" },
              { front: "Opposite of ecstatic?", back: "**melancholic** — ecstatic means overjoyed" },
              { front: "Opposite of facile?", back: "**difficult** — facile means easy" },
              { front: "Opposite of garrulous?", back: "**mute/quiet** — garrulous means talkative" },
              { front: "Opposite of munificent?", back: "**stingy** — munificent means very generous" },
              { front: "Opposite of nefarious?", back: "**honorable** — nefarious means wicked" },
              { front: "Opposite of opulence?", back: "**poverty** — opulence means great wealth" },
              { front: "Opposite of quixotic?", back: "**realistic** — quixotic means foolishly idealistic" },
              { front: "Opposite of vindictive?", back: "**forgiving** — vindictive means seeking revenge" },
              { front: "Opposite of zealous?", back: "**indifferent** — zealous means very enthusiastic" },
            ]
          }
        ]
      },
      {
        id: "eng-analogy",
        title: "Single & Double Word Analogies",
        emoji: "🔗",
        duration: "7 min",
        sections: [
          {
            type: "text",
            title: "How to Solve Analogies",
            content: "First, identify the **relationship** in the given pair. Then find the answer that has the **same relationship**. State it as a sentence: 'A is to B as C is to ___'"
          },
          {
            type: "flashcard",
            title: "Analogy Relationship Types — Tap to reveal",
            cards: [
              { front: "Moby Dick : Herman Melville", back: "**Work : Author** → The Old Man and the Sea : **Ernest Hemingway**" },
              { front: "BIR : Taxes", back: "**Agency : Function** → DPWH : **Public Roads**" },
              { front: "Barangay : Captain", back: "**Government Level : Leader** → Province : **Governor**" },
              { front: "Morse : Telegraph", back: "**Inventor : Invention** → Bell : **Telephone**" },
              { front: "Goat : Kid", back: "**Animal : Young** → Bear : **Cub**; Dog : **Puppy**; Cat : **Kitten**" },
              { front: "Dog : Kennel", back: "**Animal : Home** → Pig : **Sty**; Horse : **Stable**" },
              { front: "Dyslexia : Reading", back: "**Disorder : Affected Skill** → Aphasia : **Speech**" },
              { front: "Islet : Small Island", back: "**Small form** → Rivulet : **Small River**; Hamlet : **Small Village**" },
              { front: "Mazurka : Polish", back: "**Dance : Country of Origin** → Fandango : **Spanish**; Tango : **Argentine**" },
              { front: "Confucius : China", back: "**Philosopher : Country** → Gandhi : **India**" },
              { front: "Stalagmite : Floor", back: "**Cave formation : Location** → Stalactite : **Ceiling**" },
            ]
          },
          {
            type: "example",
            title: "Double-Word Analogy Pattern",
            items: [
              { label: "blend : mix → ?", value: "Both are synonyms → **bleach : whiten** (also synonyms)" },
              { label: "abattoir : slaughterhouse → ?", value: "Same meaning → **quay : wharf**" },
              { label: "numismatist : money → ?", value: "Expert : Field of study → **linguist : language**" },
              { label: "anxious : uneasy → ?", value: "Synonyms → look for another synonym pair" },
            ]
          }
        ]
      },
      {
        id: "eng-grammar",
        title: "Identifying Errors & Correct Usage",
        emoji: "✏️",
        duration: "8 min",
        sections: [
          {
            type: "text",
            title: "Subject-Verb Agreement",
            content: "The verb must match the subject in **number** (singular/plural). Find the TRUE subject — ignore prepositional phrases between subject and verb."
          },
          {
            type: "flashcard",
            title: "Grammar Rules — Tap to reveal",
            cards: [
              { front: "'No one ___ happy' — was or were?", back: "**was** — No one, nobody, everyone, each, either, neither → singular verb" },
              { front: "'The Cabinet regularly ___ once a week' — meet or meets?", back: "**meets** — collective nouns (Cabinet, Committee) acting as one unit → singular" },
              { front: "'Both Chelle and Charm ___ reading' — enjoy or enjoys?", back: "**enjoy** — 'Both...and' → plural verb" },
              { front: "'Either the teachers or the librarian ___ the books' — take or takes?", back: "**takes** — 'Either...or' → verb agrees with nearest subject (librarian = singular)" },
              { front: "borrow vs lend?", back: "You **borrow FROM** someone. You **lend TO** someone. 'May I **borrow** your pen?'" },
              { front: "between vs among?", back: "**Between** = 2 people/things. **Among** = 3 or more. 'Between the two candidates'; 'Among the three girls'" },
              { front: "immigrate vs emigrate?", back: "**Immigrate** = move INTO a country. **Emigrate** = move OUT OF a country." },
              { front: "persecuted vs prosecuted?", back: "**Persecuted** = harassed/oppressed. **Prosecuted** = taken to court for a crime." },
              { front: "ascent vs assent?", back: "**Ascent** = going up (noun). **Assent** = agreement/approval." },
              { front: "who's vs whose?", back: "**Who's** = who is. **Whose** = possessive ('Whose book is this?')" },
            ]
          },
          {
            type: "table",
            title: "Common Phrasal Verbs",
            headers: ["Phrasal Verb", "Meaning", "Example"],
            rows: [
              ["broke down", "stopped working / collapsed", "The secretary broke down due to stress."],
              ["brought down", "toppled / overthrew", "The scandal brought down the mayor."],
              ["called off", "cancelled", "They called off the meeting."],
              ["laid off", "terminated from work", "200 workers were laid off."],
              ["cut back", "reduce", "The company cut back expenses."],
              ["look down on", "disrespect", "Don't look down on others."],
            ]
          },
          {
            type: "example",
            title: "Commonly Confused Words",
            items: [
              { label: "rites / rights / writes", value: "'Lily **writes** remarkable poems' — rites=ritual, rights=privileges" },
              { label: "vane / vain / vein", value: "'Too **vain** will make men hate you' — vain=conceited, vane=weathervane, vein=blood vessel" },
              { label: "two / to / too", value: "'Decided **to** postpone' — two=number, too=also/excessively" },
              { label: "their / they're / there", value: "'Reason for **their** accident' — they're=they are, there=location" },
            ]
          }
        ]
      },
      {
        id: "eng-reading",
        title: "Reading Comprehension & Paragraph Development",
        emoji: "📝",
        duration: "8 min",
        sections: [
          {
            type: "text",
            title: "Reading Strategy",
            content: "**Skim** the questions first. Then **scan** the passage for answers. For main idea questions — the topic sentence is usually the **first or last sentence** of a paragraph."
          },
          {
            type: "flashcard",
            title: "Question Type Strategies — Tap to reveal",
            cards: [
              { front: "Main idea / Best title?", back: "What is the passage MOSTLY about? Don't pick something too specific or too broad." },
              { front: "Detail question?", back: "The answer is directly stated in the passage. Go back and find it — don't rely on memory." },
              { front: "Inference question?", back: "The answer is NOT directly stated — you must read 'between the lines' using logic." },
              { front: "Vocabulary in context?", back: "Substitute each choice into the sentence. Which one makes the most sense in context?" },
              { front: "Author's tone / purpose?", back: "Look at word choices: positive/negative, formal/informal, neutral/emotional." },
            ]
          },
          {
            type: "example",
            title: "Paragraph Development — Correct Order",
            items: [
              { label: "Rule 1", value: "Find the **topic sentence** (introduces main idea) — this is almost always FIRST" },
              { label: "Rule 2", value: "Look for **signal words**: First, Then, However, Therefore, In conclusion" },
              { label: "Example: Clean Air Act", value: "D (What is it?) → B (Definition) → A (Rule 1) → C (Rule 2) → Conclusion" },
              { label: "Rule 3", value: "Concluding sentence wraps up — often uses 'therefore', 'thus', 'in conclusion'" },
            ]
          },
          {
            type: "table",
            title: "Figures of Speech",
            headers: ["Figure of Speech", "Definition", "Example"],
            rows: [
              ["Simile", "Comparison using 'like' or 'as'", "'Life is like a broken-winged bird'"],
              ["Metaphor", "Direct comparison (no like/as)", "'Life is a broken-winged bird'"],
              ["Personification", "Giving human traits to non-human things", "'The wind whispered softly'"],
              ["Hyperbole", "Exaggeration for emphasis", "'I've told you a million times!'"],
              ["Irony", "Saying the opposite of what is meant", "'Great weather!' (during a storm)"],
            ]
          }
        ]
      }
    ],
    questions: [
      { id: 101, question: "Arrange alphabetically: A. Commission on Filipino Language B. Commission on Human Rights C. Commission on Higher Education D. Commission on Population", choices: ["ABCD","CBDA","ACBD","BCDA"], answer: 2, explanation: "F < Hi < Hu < P → Filipino(A), Higher(C), Human(B), Population(D) = ACBD" },
      { id: 102, question: "Arrange alphabetically: A. Santos, Anita B. Santos, Ana C. Santos, Antonio D. Santos, Anthony", choices: ["BADC","BACD","CDBA","DCBA"], answer: 1, explanation: "Ana < Anita (a<ita), Anthony < Antonio (h<i) → B,A,D,C = BADC... actually: B(Ana), A(Anita), D(Anthony), C(Antonio) = BADC" },
      { id: 103, question: "We should never be **apathetic** towards other people. 'Apathetic' means:", choices: ["indifferent","concerned","generous","worried"], answer: 0 },
      { id: 104, question: "Flowers are **ephemeral**; they bloom yet wither soon. 'Ephemeral' means:", choices: ["shrivel","long-lasting","beautiful","short-lived"], answer: 3 },
      { id: 105, question: "A good leader should be **cognizant** of issues. 'Cognizant' means:", choices: ["aware","uninformed","confused","idealistic"], answer: 0 },
      { id: 106, question: "Nobody likes **haughty** people. 'Haughty' means:", choices: ["arrogant","foolish","respectable","dependable"], answer: 0 },
      { id: 107, question: "Surgeons should be **meticulous**. Opposite of meticulous:", choices: ["strict","lenient","careless","clever"], answer: 2 },
      { id: 108, question: "He often got into trouble because he was **brusque**. OPPOSITE of brusque:", choices: ["blunt","rude","refined","curt"], answer: 2 },
      { id: 109, question: "Moby Dick : Herman Melville || The Old Man and the Sea : ___", choices: ["Charles Dickens","Ernest Hemingway","Charles Perrault","Robert Frost"], answer: 1 },
      { id: 110, question: "BIR : Taxes || DPWH : ___", choices: ["Public Roads","Houses","Traffic","Churches"], answer: 0 },
      { id: 111, question: "Barangay : Captain || Provincial Government : ___", choices: ["Congressmen","Mayor","Senator","Governor"], answer: 3 },
      { id: 112, question: "Samuel Morse : Telegraph || Alexander Graham Bell : ___", choices: ["Telescope","Telephone","Radio","Door bell"], answer: 1 },
      { id: 113, question: "Dyslexia : Reading || Aphasia : ___", choices: ["Muscle coordination","Speech","Eye movement","Memory"], answer: 1 },
      { id: 114, question: "Goat : Kid || Bear : ___", choices: ["Cub","Chicken","Kitten","Puppy"], answer: 0 },
      { id: 115, question: "'No one ___ happy about the crisis.' Which is correct?", choices: ["were","was","are","is not"], answer: 1, explanation: "'No one' → singular → 'was'" },
      { id: 116, question: "'The Cabinet regularly ___ once a week.' Which is correct?", choices: ["meet","meets","meeting","are meeting"], answer: 1, explanation: "Cabinet as a collective unit → singular → 'meets'" },
      { id: 117, question: "May I ___ your compact disk? (You want to use it)", choices: ["borrow","lend","loan","credit"], answer: 0, explanation: "You borrow FROM someone" },
      { id: 118, question: "___ the three girls, the eldest is most diligent.", choices: ["Between","Among","In","By"], answer: 1, explanation: "Three people → 'Among'" },
      { id: 119, question: "The secretary ___ due to stress. (stopped functioning)", choices: ["broke even","broke out","broke in","broke down"], answer: 3 },
      { id: 120, question: "'Life is a broken-winged bird that cannot fly.' This is a:", choices: ["Simile","Hyperbole","Metaphor","Irony"], answer: 2, explanation: "Direct comparison without 'like' or 'as' → Metaphor" },
    ]
  },

  // ── FILIPINO ─────────────────────────────────────────────────────────
  {
    id: "filipino",
    title: "Filipino",
    description: "Kasingkahulugan, kasalungat, kawikaan at wastong gamit",
    icon: "🇵🇭",
    color: "#dc2626",
    lessons: [
      {
        id: "fil-kasingkahulugan",
        title: "Kasingkahulugan (Synonyms)",
        emoji: "🗣️",
        duration: "7 min",
        sections: [
          {
            type: "text",
            title: "Estratehiya",
            content: "Basahin ang buong pangungusap. Ang kahulugan ng salita ay madalas na makikita sa konteksto. Huwag mag-asa sa isang salita lamang — basahin ang buong linya."
          },
          {
            type: "flashcard",
            title: "Kasingkahulugan — I-tap para makita",
            cards: [
              { front: "nauulinigan", back: "**napakikinggan** — naririnig, nahahalata ng pandinig" },
              { front: "nagugulumihanan", back: "**nalilito** — hindi makapagpasya" },
              { front: "tigib", back: "**punung-puno** — labis na puno" },
              { front: "isiniwalat", back: "**ibinulgar** — inilantad, ipinahayag" },
              { front: "iminungkuhi", back: "**ipinanukala** — nagmungkahi, nagpanukala" },
              { front: "kapalaluan", back: "**kayabangan** — labis na pagpapahalaga sa sarili" },
              { front: "naliligalig", back: "**magulo ang isip** — nag-aalala, hindi mapanatag" },
              { front: "maalwan", back: "**magaan** — madali, walang hirap" },
              { front: "palihan", back: "**pandayan** — lugar na ginagawa ang mga kagamitang bakal" },
              { front: "pagkutya", back: "**paglibak** — panlalait, pangungutya" },
              { front: "siniil", back: "**inapi** — pinagsamantalahan, dinusta" },
              { front: "alitan", back: "**bangayan** — away, hidwaan" },
              { front: "laganap", back: "**kalat** — kumakalat, maraming lugar" },
              { front: "himutok", back: "**reklamo** — daing, hinaing" },
              { front: "minimithi", back: "**ninanais** — pinagnanasaan, pinapangarap" },
              { front: "patang-pata", back: "**pagod na pagod** — lubos na napagod" },
            ]
          }
        ]
      },
      {
        id: "fil-kasalungat",
        title: "Kasalungat (Antonyms)",
        emoji: "↔️",
        duration: "6 min",
        sections: [
          {
            type: "text",
            title: "Payo",
            content: "Para sa kasalungat, hanapin ang salitang **kabaligtaran** ng ibinigay. Maging maingat — ang ilan ay may malapit na kahulugan subalit hindi tunay na kasalungat."
          },
          {
            type: "flashcard",
            title: "Kasalungat — I-tap para makita",
            cards: [
              { front: "Kasalungat ng matimyas?", back: "**di-totoo** — matimyas = matamis, maliwanag (tungkol sa pag-ibig)" },
              { front: "Kasalungat ng yumabong?", back: "**malanta** — yumabong = lumago, dumami" },
              { front: "Kasalungat ng lumbay?", back: "**galak** — lumbay = kalungkutan, hinagpis" },
              { front: "Kasalungat ng pagdaong?", back: "**pag-alis** — pagdaong = pagdating ng barko" },
              { front: "Kasalungat ng palasak?", back: "**pambihira** — palasak = pangkaraniwan, karaniwan" },
              { front: "Kasalungat ng umalipusta?", back: "**purihin** — umalipusta = maghamak, mangutya" },
              { front: "Kasalungat ng masalimuot?", back: "**maayos** — masalimuot = kumplikado, magulo" },
              { front: "Kasalungat ng mabungalngal?", back: "**tahimik** — mabungalngal = maingay, madaldal" },
              { front: "Kasalungat ng garil?", back: "**matatas** — garil = may diin sa pagsasalita, may halong dayuhang diin" },
              { front: "Kasalungat ng hawas?", back: "**payat** — hawas = mataba, malaki ang katawan" },
              { front: "Kasalungat ng hidhid?", back: "**waldas** — hidhid = kuripot, matipid sa labis" },
              { front: "Kasalungat ng naluoy?", back: "**namukadkad** — naluoy = nalanta, nanghina" },
              { front: "Kasalungat ng mabalasik?", back: "**maamo** — mabalasik = mapusok, mabangis" },
            ]
          }
        ]
      },
      {
        id: "fil-kawikaan",
        title: "Mga Kawikaan at Idyoma",
        emoji: "💡",
        duration: "8 min",
        sections: [
          {
            type: "text",
            title: "Ano ang Kawikaan at Idyoma?",
            content: "Ang **kawikaan** ay isang kasabihang may malalim na kahulugan. Ang **idyoma** ay parirala na ang kahulugan ay hindi literal — kailangang alamin ang figurative na kahulugan."
          },
          {
            type: "flashcard",
            title: "Mga Idyoma — I-tap para makita ang kahulugan",
            cards: [
              { front: "nag-alsa balutan", back: "**lumayas** — umalis nang bigla, tumakas" },
              { front: "bahag ang buntot", back: "**duwag** — takot, walang tapang" },
              { front: "basa ang papel", back: "**ayaw nang paniwalaan** — nawala na ang tiwala sa kanya" },
              { front: "kumukulo ang dugo", back: "**galit na galit** — labis na galit" },
              { front: "hawak sa tainga", back: "**sunud-sunuran** — laging sumusunod, walang sariling pasya" },
              { front: "mabulaklak ang landas", back: "**maganda ang kinabukasan** — maligayang buhay sa hinaharap" },
              { front: "maliit ang sisidlan", back: "**walang pasensiya** — madaling magalit" },
              { front: "nagmamatang-manok", back: "**malabo ang mata** — hindi malinaw ang paningin" },
              { front: "pabalat-bunga", back: "**pakunwari** — nagpapanggap, hindi tunay" },
              { front: "halang ang kaluluwa", back: "**maitim ang budhi** — masama ang loob, walang konsensya" },
              { front: "di-maliparan ng uwak", back: "**napakalawak** — napakalaki ng lugar o lupain" },
              { front: "makunat pa sa patola", back: "**napakatanda na** — lubhang matanda na" },
              { front: "nilubugan ng araw", back: "**nawalan ng pag-asa** — wala nang pag-asa" },
              { front: "may puyo sa talampakan", back: "**mahilig mamasyal** — laging gusto pang lumabas" },
              { front: "naniningalang-pugad", back: "**nanliligaw** — nagpapakita ng interes sa isang tao" },
              { front: "maanghang ang dila", back: "**masakit magsalita** — matamis, mapamudmod ng salita" },
              { front: "butas ang bulsa", back: "**walang pera** — laging nauubos ang pera" },
              { front: "nagtataingang-kawali", back: "**nagbibingi-bingihan** — nagpapanggap na hindi nakakarinig" },
            ]
          }
        ]
      },
      {
        id: "fil-wastong-gamit",
        title: "Wastong Gamit ng Wika",
        emoji: "📋",
        duration: "7 min",
        sections: [
          {
            type: "text",
            title: "NG vs NANG — Ang Pinakakaraniwang Pagkakamali",
            content: "Ito ang pinaka-madalas na tanong sa CSC. **NG** — nagpapakita ng pagmamay-ari o object ng pandiwa. **NANG** — ginagamit bilang pangatnig (kapag, nang) o pang-abay (paano)."
          },
          {
            type: "flashcard",
            title: "NG vs NANG — I-tap para makita",
            cards: [
              { front: "Kinuha ___ bata ang libro.", back: "**ng** — 'ng bata' = subject marker para sa pangngalang karaniwan" },
              { front: "Nagulat siya ___ dumating ang ama.", back: "**nang** — 'nang dumating' = when/kapag → pangatnig" },
              { front: "Tumakbo siya ___ mabilis.", back: "**nang** — 'nang mabilis' = paano? → pang-abay na paraan" },
              { front: "Katungkulan ___ sinuman ang tumulong.", back: "**ng** — 'ng sinuman' = object/possessive marker" },
              { front: "Isinulat ko ___ aking guro.", back: "**ng** — 'ng aking guro' = para sa/possessive" },
            ]
          },
          {
            type: "example",
            title: "Ayon sa / Ayon kay / Ayon kina",
            items: [
              { label: "Ayon sa", value: "Ginagamit para sa bagay o lugar → 'Ayon sa batas...' / 'Ayon sa doktor...'" },
              { label: "Ayon kay", value: "Ginagamit para sa isang tao → 'Ayon kay Dr. Santos...'" },
              { label: "Ayon kina", value: "Ginagamit para sa maraming tao → 'Ayon kina G. at Gng. Reyes...'" },
            ]
          },
          {
            type: "table",
            title: "May vs Mayroon",
            headers: ["Salita","Kailan Gamitin","Halimbawa"],
            rows: [
              ["May","Bago ang pangngalan","May pagkain sa mesa."],
              ["Mayroon","Bago ang 'ba', 'na', 'pa', 'pang'","Mayroon bang tao doon?"],
              ["Wala","Walang laman/katao","Wala siyang pera."],
            ]
          }
        ]
      },
    ],
    questions: [
      { id: 201, question: "Nauulinigan ang pag-uusap ng grupo. 'Nauulinigan' ay kasingkahulugan ng:", choices: ["nahihimigan","napakikinggan","nakikita","nararamdaman"], answer: 1 },
      { id: 202, question: "Nagugulumihanan si Rochelle kung anong kurso ang kukunin. 'Nagugulumihanan' ay kasingkahulugan ng:", choices: ["nagtataka","natutuwa","nagpapasalamat","nalilito"], answer: 3 },
      { id: 203, question: "Tigib na ng pasahero ang dyip. 'Tigib' ay kasingkahulugan ng:", choices: ["punung-puno","kulang-kulang","kaunting-kaunti","maraming-marami"], answer: 0 },
      { id: 204, question: "Iminungkuhi ang pagbabawal ng pagtatapon ng basura. 'Iminungkuhi' ay kasingkahulugan ng:", choices: ["ipinanukala","inilahad","isiniwalat","kinalat"], answer: 0 },
      { id: 205, question: "Madalas silang mapaaway dahil sa kanilang kapalaluan. 'Kapalaluan' ay kasingkahulugan ng:", choices: ["kalabisan","kayabangan","kagandahan","kasinungalingan"], answer: 1 },
      { id: 206, question: "Ang pag-iibigan nina Florante at Laura ay matimyas. Kasalungat ng 'matimyas':", choices: ["di-magmamaliw","di-totoo","dalisay","wagas"], answer: 1 },
      { id: 207, question: "Nilalagyan ng pataba ang halaman upang ito'y yumabong. Kasalungat ng 'yumabong':", choices: ["lumago","dumami","malanta","lumiit"], answer: 2 },
      { id: 208, question: "Namamasyal siya sa parke upang mapawi ang lumbay. Kasalungat ng 'lumbay':", choices: ["galak","lungkok","sama ng loob","gulat"], answer: 0 },
      { id: 209, question: "Palasak na ang paggamit ng kompyuter. Kasalungat ng 'palasak':", choices: ["pambihira","pangkaraniwan","laganap","matipid"], answer: 0 },
      { id: 210, question: "Nag-alsa balutan ang katulong dahil sa kalupitan ng kanyang amo. Ibig sabihin:", choices: ["nagtampo","lumayas","nagtago","nagmaktol"], answer: 1 },
      { id: 211, question: "Bahag ang buntot niya sa harap ng paghihirap. Ibig sabihin:", choices: ["malakas ang loob","matapang","duwag","matiyaga"], answer: 2 },
      { id: 212, question: "Kumukulo ang dugo ng ina ni Robin sa kanya. Ibig sabihin:", choices: ["tuwang-tuwa","galit na galit","lungkot na lungkot","nakapapaso"], answer: 1 },
      { id: 213, question: "Mabulaklak ang landas ng taong masikap. Ibig sabihin:", choices: ["malabo ang kinabukasan","makulay ang kinabukasan","magulo ang kinabukasan","maganda ang kinabukasan"], answer: 3 },
      { id: 214, question: "Butas ang bulsa ni Ana. Ibig sabihin:", choices: ["sira ang pantalon","walang pera","nagtitipid","walang panahon"], answer: 1 },
      { id: 215, question: "Katungkulan ___ sinuman ang tumulong sa kapwa. (ng/nang)", choices: ["nang","ng","namin","natin"], answer: 1, explanation: "'ng sinuman' = object marker" },
      { id: 216, question: "Nagulat ang mga tao ___ mabalitaan ang kaguluhan. (ng/nang)", choices: ["nang","ng","noon","datapwat"], answer: 0, explanation: "'nang mabalitaan' = when → pangatnig" },
      { id: 217, question: "___ G. at Gng. Reyes, matagal na nilang pinag-iipunan ang pag-aaral mo.", choices: ["Ayon sa","Ayon kay","Ayon kina","Sang-ayon kina"], answer: 2, explanation: "Dalawang tao (G. at Gng.) → 'Ayon kina'" },
    ]
  },

  // ── CONSTITUTION ─────────────────────────────────────────────────────
  {
    id: "constitution",
    title: "Philippine Constitution",
    description: "Government structure, rights & citizenship",
    icon: "⚖️",
    color: "#b45309",
    lessons: [
      {
        id: "const-branches",
        title: "Three Branches of Government",
        emoji: "🏛️",
        duration: "7 min",
        sections: [
          {
            type: "text",
            title: "Separation of Powers",
            content: "The Philippines has three co-equal branches: **Legislative** (makes laws), **Executive** (enforces laws), **Judicial** (interprets laws). Each branch checks the others — no single branch has absolute power."
          },
          {
            type: "table",
            title: "The Three Branches at a Glance",
            headers: ["Branch","Composition","Key Powers","Age Requirement"],
            rows: [
              ["Legislative (Congress)","Senate: 24 senators + House of Representatives","Pass laws, override vetoes, impeach (initiate)","Senator: 35 | HOR: 25"],
              ["Executive","President, Vice-President, Cabinet","Enforce laws, veto bills, declare martial law (60-day limit)","President: 40"],
              ["Judicial","Supreme Court (1 CJ + 14 AJ), lower courts","Declare laws unconstitutional, try impeachment cases","SC: 40"],
            ]
          },
          {
            type: "flashcard",
            title: "Key Constitutional Facts — Tap to reveal",
            cards: [
              { front: "Line of succession after President?", back: "VP → Senate President → Speaker of the House of Representatives" },
              { front: "Which bills originate from HOR?", back: "Appropriation, revenue/tariff, and private bills. Exception: **Amnesty** bills originate from Senate." },
              { front: "Who initiates impeachment?", back: "**House of Representatives** has the SOLE right to initiate. Senate TRIES the case." },
              { front: "Who is NOT removable by impeachment?", back: "Members of Congress (Senators and Representatives) — they can be expelled by their own chamber." },
              { front: "Veto communication deadline?", back: "President must communicate veto within **30 days** after receipt; otherwise it becomes law." },
              { front: "How many senators does the Senate have?", back: "**24 senators**, serving 6-year terms, max 2 consecutive terms." },
            ]
          }
        ]
      },
      {
        id: "const-rights",
        title: "Rights, Citizenship & Constitutional Commissions",
        emoji: "📜",
        duration: "6 min",
        sections: [
          {
            type: "text",
            title: "Key Constitutional Provisions",
            content: "The Philippines adopts a **Republican and Democratic** form of government. The State recognizes the **family** as the foundation of the nation. National language: **Filipino**."
          },
          {
            type: "flashcard",
            title: "Rights & Citizenship Facts — Tap to reveal",
            cards: [
              { front: "Who can issue a warrant of arrest?", back: "Only a **judge** — not a senator, congressman, or the President." },
              { front: "What is suffrage?", back: "The **right to vote**. Filipino citizens, 18+, for at least 1 year resident." },
              { front: "How does a foreigner become a citizen?", back: "Through **naturalization** — the legal process of acquiring citizenship." },
              { front: "What is eminent domain?", back: "Power of the State to take private property for **public use** upon payment of **just compensation**." },
              { front: "What is the Preamble?", back: "The **introductory part** of the Constitution. It states the ideals and aspirations of the Filipino people." },
            ]
          },
          {
            type: "table",
            title: "The 3 Constitutional Commissions (CSC, COMELEC, COA)",
            headers: ["Commission","Full Name","Function"],
            rows: [
              ["CSC","Civil Service Commission","Governs the civil service / government employment"],
              ["COMELEC","Commission on Elections","Oversees elections, referenda, plebiscites"],
              ["COA","Commission on Audit","Audits all government funds and expenditures"],
            ]
          },
          {
            type: "tip",
            content: "**Common mistake:** The Commission on Human Rights is NOT one of the three constitutional commissions — it is a constitutional body but not a commission in the same category."
          }
        ]
      },
      {
        id: "const-taxes",
        title: "Taxes, Natural Resources & Local Government",
        emoji: "💰",
        duration: "6 min",
        sections: [
          {
            type: "text",
            title: "Important Numbers to Remember",
            content: "**Local officials** serve 3-year terms, max 3 consecutive terms. **Aliens** may own maximum **40%** equity in corporations exploiting natural resources (Filipinos must own at least 60%). Income tax deadline: **April 15**."
          },
          {
            type: "table",
            title: "Types of Taxes",
            headers: ["Tax Type","What is Taxed","Key Detail"],
            rows: [
              ["Income Tax","Compensation/earnings","Deadline: April 15 annually"],
              ["Estate Tax","Property transferred at death","Tax on the right to transmit property"],
              ["Donor's Tax","Gifts given while alive","Tax on voluntary transfers"],
              ["VAT (Value Added Tax)","Goods and services consumed","12% standard rate in PH"],
              ["Excise Tax","Specific goods: tobacco, alcohol, fuel","On top of regular taxes"],
            ]
          },
          {
            type: "flashcard",
            title: "Natural Resources & Land — Tap to reveal",
            cards: [
              { front: "Who owns natural resources?", back: "The **State** (public domain). Corporations can explore/develop with Filipino majority ownership (60%+)." },
              { front: "What lands are alienable?", back: "Only **agricultural lands** of the public domain. Forest, mineral lands, and national parks are NOT alienable." },
              { front: "Who proposes constitutional amendments?", back: "**Congress** (3/4 vote) OR a **Constitutional Convention**. Not the Judiciary alone." },
              { front: "Who is 'Head of Family' for taxes?", back: "An **unmarried individual** who maintains a household with dependents." },
            ]
          }
        ]
      }
    ],
    questions: [
      { id: 301, question: "What do you call the introductory part of the Constitution?", choices: ["Preface","Amendments","Preamble","Bill of Rights"], answer: 2 },
      { id: 302, question: "What form of government does the Philippines adopt?", choices: ["Republican only","Democratic only","Neither","Both Republican and Democratic"], answer: 3 },
      { id: 303, question: "What is the power of the State to take private property for public use with just compensation?", choices: ["Right of confiscation","Right of limiting resources","Right of sequestration","Right of eminent domain"], answer: 3 },
      { id: 304, question: "Who may issue a warrant of arrest or search warrant?", choices: ["A senator","A judge","A congressman","The President"], answer: 1 },
      { id: 305, question: "A foreigner may acquire Filipino citizenship through:", choices: ["Naturalization","Extradition","Rebirth","Visa application"], answer: 0 },
      { id: 306, question: "How many Senators does the Philippine Senate have?", choices: ["25","24","12","30"], answer: 1 },
      { id: 307, question: "What is the minimum age to run for Senator?", choices: ["30","25","20","35"], answer: 3 },
      { id: 308, question: "Which bills do NOT originate from the House of Representatives?", choices: ["Appropriation bills","Revenue or tariff bills","Amnesty bills","Private bills"], answer: 2, explanation: "Amnesty bills originate from the Senate." },
      { id: 309, question: "The correct line of succession if President is incapacitated:", choices: ["President→VP→Senate President→House Speaker","President→VP→Chief Justice→Senate President","President→VP→House Speaker→Senate President","President→VP→Chief Justice→House Speaker"], answer: 0 },
      { id: 310, question: "The Supreme Court is composed of:", choices: ["A Chief Justice and 14 Associate Justices","Two Chief Justices and 14 Associate Justices","A Chief Justice and 12 Associate Justices","A Chief Justice and 15 Associate Justices"], answer: 0 },
      { id: 311, question: "Which of the following is a Constitutional Commission?", choices: ["Commission on Human Rights","PCGG","Civil Service Commission","Commission on Natural Resources"], answer: 2 },
      { id: 312, question: "Which branch has the SOLE right to INITIATE impeachment?", choices: ["Senate","COMELEC","House of Representatives","Judiciary"], answer: 2 },
      { id: 313, question: "The national language of the Philippines is:", choices: ["Pilipino","English and Filipino","Tagalog","Filipino"], answer: 3 },
      { id: 314, question: "Who may propose amendments to the Constitution?", choices: ["Congress or a Constitutional Convention","Congress and a Constitutional Convention","Judiciary and Congress","Judiciary and Constitutional Convention"], answer: 0 },
      { id: 315, question: "Income tax deadline in the Philippines:", choices: ["April 15","April 30","March 15","March 30"], answer: 0 },
      { id: 316, question: "What tax is imposed on one's right to transmit property at death?", choices: ["Excise tax","Withholding tax","Donor's tax","Estate tax"], answer: 3 },
      { id: 317, question: "Maximum equity for aliens in corporations exploiting natural resources:", choices: ["60%","40%","50%","30%"], answer: 1 },
      { id: 318, question: "Term of office for elective local officials:", choices: ["3 years","4 years","6 years","Indefinite"], answer: 0 },
      { id: 319, question: "What is recognized as the foundation of the nation?", choices: ["Barangay","Community","Family","Municipality"], answer: 2 },
      { id: 320, question: "What may be classified as alienable lands of the public domain?", choices: ["Forest","Mineral lands","National park","Agricultural lands"], answer: 3 },
    ]
  },

  // ── REASONING ────────────────────────────────────────────────────────
  {
    id: "reasoning",
    title: "Inductive Reasoning",
    description: "Number series, letter series & patterns",
    icon: "🧠",
    color: "#0891b2",
    lessons: [
      {
        id: "reason-number",
        title: "Number Series Patterns",
        emoji: "📊",
        duration: "8 min",
        sections: [
          {
            type: "text",
            title: "How to Approach Series Questions",
            content: "Always write out the **differences** between terms. Then write the differences of those differences. A pattern almost always emerges within 2 levels."
          },
          {
            type: "flashcard",
            title: "Number Pattern Types — Tap to reveal",
            cards: [
              { front: "3, 6, 9, 12, 15, ___", back: "**+3 each time** → next: **18**" },
              { front: "10, 17, 26, 37, ___", back: "Differences: 7, 9, 11 → next diff: 13 → **50**" },
              { front: "37, 50, 65, 82, ___", back: "Differences: 13, 15, 17 → next diff: 19 → **101**" },
              { front: "6, 12, 36, 72, 216, ___", back: "Pattern: ×2, ×3, ×2, ×3 → next: ×2 → **432**" },
              { front: "1, 2, 5, 6, 11, 12, 19, 20, ___", back: "Two sequences: 1,5,11,19 (diff: 4,6,8) and 2,6,12,20 (diff: 4,6,8) → next A: 29 → **29**" },
              { front: "4, 9, 5, 11, 6, 13, 7, 15, ___", back: "Two sequences: 4,5,6,7 (+1) and 9,11,13,15 (+2) → next A: **8**" },
              { front: "3, 8, 48, 55, 440, ___", back: "Pattern: +5, ×6, +7, ×8 → next: +9 → **449**" },
              { front: "396, 384, 370, 354, 336, ___", back: "Differences: -12, -14, -16, -18 → next: -20 → **316**" },
              { front: "29, 58, 29, 145, 29, ___", back: "Alternate: 29 stays, other terms: 58=29×2, 145=29×5 → next: 29×8 → **232**" },
            ]
          },
          {
            type: "example",
            title: "Step-by-Step: 1, 2, 6, 12, 36, ___",
            items: [
              { label: "Find pattern", value: "1→2 (+1), 2→6 (×3), 6→12 (+6), 12→36 (×3)" },
              { label: "Pattern", value: "Alternating: +n, ×3, +2n, ×3" },
              { label: "Next operation", value: "+36 → 36+36 = **72**" },
            ]
          },
          {
            type: "tip",
            content: "When stuck, check if there are **two alternating sequences** hidden inside. Separate odd-positioned and even-positioned terms and analyze each independently."
          }
        ]
      },
      {
        id: "reason-letter",
        title: "Letter & Alphanumeric Series",
        emoji: "🔡",
        duration: "8 min",
        sections: [
          {
            type: "text",
            title: "Letter Position System",
            content: "A=1, B=2, C=3... Z=26. When letters skip positions, the pattern is in the NUMBER of positions jumped. This applies even for reverse series."
          },
          {
            type: "flashcard",
            title: "Letter Series Patterns — Tap to reveal",
            cards: [
              { front: "C, E, G, I, K, ___", back: "Skip 1 letter each time (+2 positions) → **M**" },
              { front: "AB, EF, IJ, MN, ___", back: "Skip 2 letters between pairs: AB(1-2), EF(5-6), IJ(9-10), MN(13-14) → **QR** (17-18)" },
              { front: "ZY, WV, TS, QP, ___", back: "Reverse pairs, going backward by 3: Z-Y(26-25), W-V(23-22), T-S(20-19), Q-P(17-16) → **NM** (14-13)" },
              { front: "DC, HG, LK, PO, ___", back: "Reverse consecutive pairs, +4 between: DC, HG, LK, PO → **TS**" },
              { front: "MZ, KX, IV, GT, ___", back: "First letter -2, second letter -2: M→K→I→G→**E**; Z→X→V→T→**R** → **ER**" },
              { front: "AZ, BY, CX, DW, EV, ___", back: "First letter forward (+1), second letter backward (-1): A→Z, B→Y... E→V → **FU**" },
              { front: "LO, KP, JQ, IR, HS, ___", back: "First -1, second +1: L-O, K-P, J-Q, I-R, H-S → **GT**" },
              { front: "A, C, F, J, O, ___", back: "Gaps: +2, +3, +4, +5, +6 → O + 6 = U → **U**" },
              { front: "H, H, L, L, P, P, T, T, ___", back: "Each letter repeated twice, +4 each: H(8), L(12), P(16), T(20) → X(24) → **X**" },
            ]
          },
          {
            type: "flashcard",
            title: "Alphanumeric Series — Tap to reveal",
            cards: [
              { front: "E4, G6, I8, K10, M12, ___", back: "Letters: +2 each (skip 1). Numbers: +2 each → **O14**" },
              { front: "F21, H19, K16, O12, T7, ___", back: "Letters: +2,+3,+4,+5 gaps. Numbers: -2,-3,-4,-5 → Z(+6), 7-6=1 → **Z1**" },
              { front: "J1017, L1215, N1413, ___", back: "Letters: J→L→N→P (+2). Numbers: 10→12→14→16 (+2); 17→15→13→11 (-2) → **P1611**" },
              { front: "8R, 6T, 4V, ___", back: "Numbers: -2 each (8,6,4,**2**). Letters: +2 each (R,T,V,**X**) → **2X**" },
              { front: "AC, FH, KM, ___", back: "Letter pairs skip 1 inside (A-C, F-H, K-M), pairs skip 4: A(1),F(6),K(11) → P(16) → **PR**" },
            ]
          }
        ]
      }
    ],
    questions: [
      { id: 401, question: "3, 6, 9, 12, 15, ___", choices: ["2","18","22","20"], answer: 1, explanation: "+3 each time → 15+3 = 18" },
      { id: 402, question: "C, E, G, I, K, ___", choices: ["L","M","N","O"], answer: 1, explanation: "Skip 1 letter (+2 positions) → K is 11, next is 13 = M" },
      { id: 403, question: "10, 17, 26, 37, ___", choices: ["48","49","50","51"], answer: 2, explanation: "Differences: 7,9,11 → next diff: 13 → 37+13 = 50" },
      { id: 404, question: "37, 50, 65, 82, ___", choices: ["98","99","100","101"], answer: 3, explanation: "Differences: 13,15,17 → next: 19 → 82+19 = 101" },
      { id: 405, question: "3, 9, 5, 25, 8, 64, 12, 144, ___", choices: ["15","17","20","16"], answer: 3, explanation: "Two sequences: 3,5,8,12 (diff: 2,3,4) → next: 16; other sequence: 9,25,64,144 are squares" },
      { id: 406, question: "AB, EF, IJ, MN, ___", choices: ["OP","PQ","QR","RS"], answer: 2, explanation: "Skip 2 letters between pairs: 1-2, 5-6, 9-10, 13-14 → 17-18 = QR" },
      { id: 407, question: "ZY, WV, TS, QP, ___", choices: ["NM","ML","LK","KJ"], answer: 0, explanation: "Reverse pairs going backward by 3 positions: 26-25, 23-22, 20-19, 17-16 → 14-13 = NM" },
      { id: 408, question: "6, 12, 36, 72, 216, ___", choices: ["250","300","400","432"], answer: 3, explanation: "Pattern: ×2, ×3, ×2, ×3 → 216×2 = 432" },
      { id: 409, question: "1, 2, 5, 6, 11, 12, 19, 20, ___", choices: ["25","27","29","31"], answer: 2, explanation: "Two alternating sequences: 1,5,11,19 (+4,+6,+8) → next: +10 = 29" },
      { id: 410, question: "MZ, KX, IV, GT, ___", choices: ["ER","FS","DQ","CP"], answer: 0, explanation: "First letter -2: M,K,I,G → E. Second letter -2: Z,X,V,T → R → ER" },
      { id: 411, question: "AZ, BY, CX, DW, EV, ___", choices: ["GT","FU","HS","IR"], answer: 1, explanation: "First letter +1, second letter -1: E→F, V→U → FU" },
      { id: 412, question: "E4, G6, I8, K10, M12, ___", choices: ["O14","Q16","N14","L16"], answer: 0, explanation: "Letters skip 1 (+2): M→O. Numbers +2: 12→14 → O14" },
      { id: 413, question: "3, 8, 48, 55, 440, ___", choices: ["448","449","450","447"], answer: 1, explanation: "+5, ×6, +7, ×8, +9 → 440+9 = 449" },
      { id: 414, question: "396, 384, 370, 354, 336, ___", choices: ["318","314","316","310"], answer: 2, explanation: "Differences: -12,-14,-16,-18 → next: -20 → 336-20 = 316" },
      { id: 415, question: "A, C, F, J, O, ___", choices: ["T","U","S","R"], answer: 1, explanation: "Gaps: +2,+3,+4,+5,+6 → O(15)+6 = U(21)" },
      { id: 416, question: "8R, 6T, 4V, ___", choices: ["2X","17j","15e","24w"], answer: 0, explanation: "Numbers -2: 8,6,4,**2**. Letters +2: R,T,V,**X** → 2X" },
      { id: 417, question: "F21, H19, K16, O12, T7, ___", choices: ["A26","Z1","X3","B25"], answer: 1, explanation: "Letter gaps: +2,+3,+4,+5,+6 → T+6=Z. Number gaps: -2,-3,-4,-5,-6 → 7-6=1 → Z1" },
      { id: 418, question: "LO, KP, JQ, IR, HS, ___", choices: ["GT","FU","EV","DW"], answer: 0, explanation: "First letter -1: L,K,J,I,H → G. Second letter +1: O,P,Q,R,S → T → GT" },
      { id: 419, question: "4, 9, 5, 11, 6, 13, 7, 15, ___", choices: ["19","9","8","17"], answer: 2, explanation: "Two sequences: 4,5,6,7 → **8**; 9,11,13,15 → 17" },
      { id: 420, question: "29, 58, 29, 145, 29, ___", choices: ["231","232","233","234"], answer: 1, explanation: "Alternate: 29 repeats; other terms: 58=29×2, 145=29×5 → 29×8=232" },
    ]
  }
];

// Exam questions: 20 per topic = 100 total (but we do 80 from PDF proportions)
export const examQuestions: Question[] = [
  ...topics[0].questions.slice(0, 16), // Math: 16
  ...topics[1].questions.slice(0, 16), // English: 16
  ...topics[2].questions.slice(0, 14), // Filipino: 14
  ...topics[3].questions.slice(0, 18), // Constitution: 18
  ...topics[4].questions.slice(0, 16), // Reasoning: 16
  // Total: 80
];

// ── Randomized exam generator ────────────────────────────────────────
// Picks questions proportionally from each topic's FULL question bank,
// shuffles the selection, then shuffles each question's choices
// (tracking the new correct answer index after shuffle).

export interface ShuffledQuestion extends Question {
  originalId: number;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateExam(seed?: number): ShuffledQuestion[] {
  const rng = seed ?? Date.now();

  // How many questions to draw from each topic (proportional, totals 80)
  const draws: { topicIdx: number; count: number }[] = [
    { topicIdx: 0, count: 20 }, // Math
    { topicIdx: 1, count: 20 }, // English
    { topicIdx: 2, count: 14 }, // Filipino
    { topicIdx: 3, count: 16 }, // Constitution
    { topicIdx: 4, count: 10 }, // Reasoning
  ];

  let allQuestions: ShuffledQuestion[] = [];
  let seedOffset = 0;

  for (const { topicIdx, count } of draws) {
    const pool = topics[topicIdx].questions;
    // Shuffle the pool, then take `count` questions
    const shuffledPool = seededShuffle(pool, rng + seedOffset);
    seedOffset += 777;
    const picked = shuffledPool.slice(0, Math.min(count, pool.length));

    // For each picked question, also shuffle the choices
    for (const q of picked) {
      const correctAnswer = q.choices[q.answer];
      const shuffledChoices = seededShuffle(q.choices, rng + seedOffset);
      seedOffset += 333;
      const newAnswerIdx = shuffledChoices.indexOf(correctAnswer);
      allQuestions.push({
        ...q,
        originalId: q.id,
        choices: shuffledChoices,
        answer: newAnswerIdx,
      });
    }
  }

  // Finally shuffle the question ORDER itself
  return seededShuffle(allQuestions, rng + seedOffset);
}
