// src/assets/trainingPlan.ts

export type CyclePhase = 'Menstruation' | 'Follicular' | 'Ovulation' | 'Luteal';

export interface DayPlan {
  day: number;                   // 1–28
  phase: CyclePhase;
  heading: string;
  bullets: string[];            // exactly 3 items
  details?: string;
  active: boolean;              // if true, blob is “completed” or “in-progress”. If false, blob is “locked”.
  isToday: boolean;             // if true, blob is “in-progress”
}

/**
 * Quick helper to construct each DayPlan.
 * Note: `active` and `isToday` are explicit booleans now.
 */
const P = (
  day: number,
  phase: DayPlan['phase'],
  heading: string,
  bullets: [string, string, string],
  details: string | undefined,
  active: boolean,
  isToday: boolean
): DayPlan => ({
  day,
  phase,
  heading,
  bullets,
  details,
  active,
  isToday,
});

/**
 * (For demonstration) let’s assume “today” is Day 2.
 * In a real app, you could compute `isToday` by comparing `new Date()` to a stored cycle‐start date.
 */
const TODAY = 2;

/**
 * Sarah’s 28‐day training plan, now with `active` and `isToday`.
 * - Days < TODAY → active = true, isToday = false
 * - Day == TODAY → active = true, isToday = true
 * - Days > TODAY → active = false, isToday = false
 */
export const trainingPlan: DayPlan[] = [
  // Day 1
  P(
    1,
    'Menstruation',
    'Rest or Stretching',
    [
      'Rest day or subtle stretching exercises (at home)',
      'Listen to your body and do what feels right',
      'Focus on relaxation and mobility',
    ],
    `Listen to your body and do what feels right. This can be anything from meditation to stretching and yoga.
If you feel like you want to do some physical activity, here's a plan for stretching:

- Neck stretch: hold for 20–30 seconds  
- Shoulder rolls: 10 times each  
- Cross-body stretch: 30 seconds per side  
- Side stretch: 30 seconds each side  
- Seated forward fold: 1 minute  
- Child's pose: 2 minutes  
- Figure 4 stretch: 1 minute each side`,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 2 (today)
  P(
    2,
    'Menstruation',
    'Light Activity',
    [
      'Light activity such as a walk outside',
      'Stay active with gentle movements',
      'Prioritize low-intensity movement',
    ],
    `Choose a gentle walk of low intensity with duration of around 20 minutes. 
If you don't feel like going for a walk, try to stay active during general activity—take the stairs, reduce time sitting, do some arm cycling or take some fresh air.`,
    /* active */ true,
    /* isToday */ true
  ),

  // Day 3
  P(
    3,
    'Menstruation',
    'Active Recovery',
    [
      'Gentle upper body strength training',
      'Extended cool-down and stretching',
      'Focus on breathing and recovery',
    ],
    undefined,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 4
  P(
    4,
    'Follicular',
    'Endurance Basics',
    [
      'Training: walk or easy cycling',
      'Keep it light to moderate',
      'Emphasize consistency',
    ],
    undefined,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 5
  P(
    5,
    'Follicular',
    'Preparation Day',
    [
      'Dynamic stretching routine',
      'Short meditation or breath work',
      'Mental focus on goals',
    ],
    undefined,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 6
  P(
    6,
    'Follicular',
    'Lower Body Strength',
    [
      'Home workout: lower body focus',
      'Includes warm-up and cool-down',
      'Strength & mobility',
    ],
    `Your lower body is in focus today.

Warm-up:  
- Jumping jacks: 2 minutes  
- March in place: 2 minutes  
- Arm circles: 30 seconds  
- Hip circles: 30 seconds  

Strength training (10–15 reps each with 60 s rest):  
- Goblet squat  
- Glute bridges  
- Step-ups in place  
- Calf raises  
- Bird-dog  
- Optional: Plank hold (60 seconds)  

Cool-down (hold each 45 s):  
- Standing quad stretch  
- Figure 4 stretch  
- Child’s pose`,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 7
  P(
    7,
    'Follicular',
    'Rest Day',
    [
      'Recovery from strength training',
      'Fresh air and relaxation',
      'Do something that feels good',
    ],
    `You've been working out yesterday. Treat yourself to some relaxation and do something that feels good for you. Catch some fresh air, if you feel like it!`,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 8
  P(
    8,
    'Ovulation',
    'Endurance Training',
    [
      'Jogging or cycling',
      'Focus on light endurance',
      '15 km bike / 5 km run (target HR 75–113 bpm)',
    ],
    `Your body regains its strength—it’s time for endurance training!
Grab your bike or jogging shoes and do a tour of about 15 km or a run of about 5 km!
Your target heart frequency is 75–113 bpm.`,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 9
  P(
    9,
    'Ovulation',
    'Strength Training (Studio)',
    [
      'Upper body strength workout',
      'Warm-up and machine exercises',
      'Cool-down and stretching',
    ],
    `Ready to set your strength under proof? Your upper body is in focus today.

Warm-up:  
- Rowing or treadmill jog: 5 minutes  
- Cross-body arm swings: 30 seconds  
- Band pull-aparts: 15 reps  
- Scapular push-ups: 10–15 reps  

Strength (3 sets × 10 reps, choose weight so reps 8–10 are hard, rest 90 s):  
- Bench press  
- Seated cable row  
- Overhead shoulder press  
- Lat pulldown  
- Cable lateral raises  
- Triceps pushdown  
- Biceps curl  

Cool-down:  
- Triceps overhead stretch: 30 s per side  
- Doorway chest stretch: 45 s  
- Lat stretch on bar: 30 s  
- Wrist flexor & extensor stretch: 30 s per side  
- Neck side stretch: 20–30 s`,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 10
  P(
    10,
    'Ovulation',
    'Rest Day',
    [
      'Recovery from studio strength day',
      'Optional feedback on intensity',
      'Focus on passive relaxation',
    ],
    `Yesterday was an intense training. Give your body time to rest!
If you feel like you could have worked out more yesterday, give feedback on the training plan and we will consider it when updating your training plan next time.`,
    /* active */ true,
    /* isToday */ false
  ),

  // Day 11
  P(
    11,
    'Luteal',
    'Moderate Endurance',
    [
      'Walk, swim, or light cycling',
      'Focus on steady pace',
      'Stay hydrated and take breaks',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 12
  P(
    12,
    'Luteal',
    'Mobility & Stretching',
    [
      'Gentle mobility drills',
      'Stretching for hips and back',
      'Optional foam rolling',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 13
  P(
    13,
    'Luteal',
    'Strength Maintenance',
    [
      'Bodyweight or resistance band training',
      'Include core and glutes',
      'Light reps, no max effort',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 14
  P(
    14,
    'Luteal',
    'Rest Day',
    [
      'Full recovery',
      'Extra sleep or nap',
      'Hydration and nutrition',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 15
  P(
    15,
    'Luteal',
    'Cardio Focus',
    [
      '30-minute brisk walk or elliptical',
      'Maintain low to moderate HR',
      'Focus on rhythm and breath',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 16
  P(
    16,
    'Luteal',
    'Strength Training (Home)',
    [
      'Circuit of compound bodyweight exercises',
      'Include warm-up & cool-down',
      'Stretch thoroughly after',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 17
  P(
    17,
    'Luteal',
    'Active Recovery',
    [
      'Gentle yoga or walk',
      'No intense effort',
      'Reflect on training week',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 18
  P(
    18,
    'Menstruation',
    'Self-Care Day',
    [
      'Short walk or complete rest',
      'Breathwork or meditation',
      'Check-in with your body',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 19
  P(
    19,
    'Menstruation',
    'Mobility & Core',
    [
      'Stretching for hips/lower back',
      'Gentle core activation',
      'Deep breathing exercises',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 20
  P(
    20,
    'Menstruation',
    'Low Impact Strength',
    [
      'Short, bodyweight circuit',
      'Focus on form over volume',
      'Rest as needed',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 21
  P(
    21,
    'Follicular',
    'Endurance Restart',
    [
      'Walk, cycle, or dance workout',
      'Keep intensity playful',
      'Enjoy movement',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 22
  P(
    22,
    'Follicular',
    'Strength Building',
    [
      'Lower-body focus',
      '2–3 sets of compound exercises',
      'Include hip mobility work',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 23
  P(
    23,
    'Follicular',
    'Yoga or Pilates',
    [
      'Core and flexibility focus',
      'Stay mindful and intentional',
      'Breath-led movement',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 24
  P(
    24,
    'Follicular',
    'Endurance Training',
    [
      'Jog or long walk (45 mins)',
      'Hydrate well',
      'Recovery snack afterwards',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 25
  P(
    25,
    'Ovulation',
    'Power Strength',
    [
      'Upper-body push & pull',
      'Heavier resistance (if possible)',
      'Track progress',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 26
  P(
    26,
    'Ovulation',
    'Interval Cardio',
    [
      'Short sprints or HIIT (20 mins)',
      'Include warm-up & cool-down',
      'Stay within safe limits',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 27
  P(
    27,
    'Ovulation',
    'Stretch & Mobility',
    [
      'Full body stretches',
      'Pay attention to shoulders and hips',
      'Stay relaxed',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),

  // Day 28
  P(
    28,
    'Luteal',
    'Mindful Movement',
    [
      'Choose your favorite gentle workout',
      'No performance pressure',
      'Celebrate your consistency',
    ],
    undefined,
    /* active */ false,
    /* isToday */ false
  ),
];
