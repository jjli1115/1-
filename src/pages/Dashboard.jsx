import { Brain, Moon, DollarSign, Activity, Award } from 'lucide-react';
import { format, subDays } from "date-fns";
import StatsCard from "../components/dashboard/StatsCard"
import ProgressRing from "../components/dashboard/ProgressRing"
import AchievementBadge from "../components/dashboard/AchievementBadge"
import TrendChart from "../components/shared/TrendChart"

export default function Dashboard() {

    // Mock data

    const mockMetrics = [
        {
            id: 1,
            name: "Memory Recall",
            category: "memory",
            current_value: 85,
            baseline_value: 1,
            target_value: 99,
            unit: "%"
        },
        {
            id: 2,
            name: "Sleep Quality",
            category: "sleep",
            current_value: 7.5,
            baseline_value: 7,
            target_value: 8,
            unit: "hrs"
        },
        {
            id: 3,
            name: "Net Worth",
            category: "finance",
            current_value: 35420,
            baseline_value: 10000,
            target_value: 100000,
            unit: "$"
        },
        {
            id: 4,
            name: "Memory Recall",
            category: "memory",
            current_value: 85,
            baseline_value: 70,
            target_value: 99,
            unit: "%"
        },

    ];

    // Mock data for entries
    const mockEntries = Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        metric_id: 1,
        value: Math.floor(Math.random() * 20) + 70,
        date: format(subDays(new Date(), i), 'yyyy-MM-dd')
    }));

    // Mock data for achievements
    const mockAchievements = [
        { id: 1, title: "First Step", description: "Logged your first entry", unlocked: true, icon: "🎯"},
        { id: 2, title: "Week Warrior", description: "7-day streak", unlocked: true, icon: "🔥"},
        { id: 3, title: "Month Master", description: "30-day streak", unlocked: true, icon: "💪"},
        { id: 4, title: "Century Club", description: "100 total entries", unlocked: true, icon: "💯"},
        { id: 5, title: "Early Bird", description: "14-day streak of waking up before 8am", unlocked: true, icon: "🌅"},
        { id: 6, title: "Peak Performance", description: "50 days of reaching your daily goals", unlocked: true, icon: "🦉"},
        { id: 7, title: "Finisher", description: "Completed 10 hard goals", unlocked: true, icon: "🌟"}
    ];

    const getMetricsByCategory = (category) => {
        return mockMetrics.filter(m => m.category === category);
    };

    const getRecentEntries = (metricId, days = 7) => {
        return mockEntries
        .filter(e => e.metric_id === metricId)
        .slice(0,days)
        .reverse()
        .map(e => ({
            date: format(new Date(e.date), 'MMM dd'),
            value: e.value
        }));
    };

    const calculateProgress = (metric) => {
        if (!metric.target_value || !metric.baseline_value) return 0;
        const progress = ((metric.current_value - metric.baseline_value) / (metric.target_value - metric.baseline_value)) * 100;
        return Math.min(Math.max(progress, 0), 100);
    };

    const unlockedAchievements = mockAchievements.filter(a => a.unlocked);
    const totalXP = mockEntries.length * 10;
    const currentLevel = Math.floor(totalXP / 100) + 1;
    const currentStreak = 5;

    return (
        <div className="p-4 pb-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="text-center py-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
                    <p className="text-gray-600">Let's make today 1% better</p>
                </div>

                {/* Progress Ring Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-center mb-4">
                        <ProgressRing
                            progress={Math.min((mockEntries.length / 100) * 100, 100)}
                            size={140}
                            strokeWidth={10}
                            value={`${mockEntries.length}`}
                            label="entries"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{currentLevel}</p>
                            <p className="text-xs text-gray-600">Level</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{currentStreak}</p>
                            <p className="text-xs text-gray-600">Day Streak</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{unlockedAchievements.length}</p>
                            <p className="text-xs text-gray-600">Achievements</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-3">
                    {getMetricsByCategory('memory').slice(0,1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={5}
                            icon={Brain}
                            color="from-blue-500 to-cyan-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}
                    
                    {getMetricsByCategory('sleep').slice(0, 1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={3}
                            icon={Moon}
                            color="from-purple-500 to-indigo-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}

                    {getMetricsByCategory('finance').slice(0, 1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={8}
                            icon={DollarSign}
                            color="from-green-500 to-emerald-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}

                    {getMetricsByCategory('fitness').slice(0, 1).map(metric => (
                        <StatsCard
                            key={metric.id}
                            title={metric.name}
                            value={metric.current_value || 0}
                            unit={metric.unit}
                            change={-2}
                            icon={Activity}
                            color="from-orange-500 to-red-500"
                            progress={calculateProgress(metric)}
                            />
                    ))}
                </div>

                {/* Trend Chart */}
                {mockMetrics.length > 0 && (
                    <TrendChart
                    data={getRecentEntries(mockMetrics[0].id)}
                    title="7-Day Progress Trend"
                    color="#a855fd7"
                    />
                )}

                {/* Achievements Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <Award className="w-5 h-5 text-amber-600" />
                        <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
                    </div>
                    {<div className="grid grid-cols-3 gap-3">
                        {mockAchievements.slice(0, 6).map((achievement, index) => (
                            <AchievementBadge
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                            />
                        ))} 
                    </div>}
                </div>
            </div>
        </div>
    )
}


// Need to work on moving the app into TestFlight tomorrow (11.07.2025)
// As of 11.07.2025 10:37p, I failed to move the app into TestFlight, next planned date to move it will be 11.09.2025
// As of 11.08.2025 it seems like the process to move this onto iOS app could take 1-2 months, we will begin and see how long it takes and use this as a record
// As of 11.09.2025 it seems like I need to start porting the app from React to Swift UI to get it onto TestFlight
// 11.10.2025 - Today felt like a weekend, woke up early 7:06a but didn't want to jinx the day so went back to bed until 10:30a, got a krispy kreme donut and bunt cake (saw MacGregor)
// 11.11.2025 - Did a decent amount of work, ~4 hrs, for Boosted.AI but need to start on XCode tomorrow on Mac

// Below is imported from index.html from my personal website
//11.05.2025 Todo list: Import Bio Markers into 1%
//11.14.2025 My rate of learning and development in coding is so slow
//11.15.2025 Today is my birthday, and also the first day of the Bay Area Founders Club AI Summit, I think it's an ok conference
//11.20.2025 Today I am visiting HBS, it's an interesting place. I need to get a job where it's helpful for me to come here
//11.21.2025 Still at HBS today, with Section X India
//11.22.2025 Went to Harvard v Yale today, Harvard lost 28 to 45, and saw Angela's Freestyle dance show after
//11.23.2025 Flew back to the Bay from Boston today
//11.24.2025 Friendsgiving at Dave's new house today
//11.25.2025 Return to coding tomorrow to continue building 1% iOS App and the Find Anything iOS App
//11.26.2025 Things to track for personal benchmarking: Finances (Credit Score & Net Worth), Health (Sleep, Strength, Endurance, Weight, Biomarkers from Blood Tests, Gut Test, Skin)
//11.27.2025 Today was mom's birthday and Thanksgiving - I want to find out how to find the joy in coding and how to find ways to enjoy coding and code for hours at a time
//11.28.2025 Had dinner with Angela & Dad today, want to learn more about all the fields of AI (e.g. CoT, RNN, RLHF, etc) and review code base for The Mirror Ring
//11.29.2025 Went shopping for Mom's birthday today and had dinner at VF, goal for tomorrow: wake up at 8a, read Meta casestudy, complete the four different tabs for 1%
//11.30.2025 Last day of November this year, time goes fast; today I woke up at 9a, read the Meta casestudy, but did not complete the four tabs for 1%; tomorrow I will complete the four tabs for 1%
//12.01.2025 Still didn't complete the four tabs today. Do I give up or do I push through?
//12.02.2025 
//12.04.2025 Forgot to push yesterday; I want to write for Contrary and code after work
//12.05.2025 Reached out about Contrary, need to reach out to Kyle Harrison @ Contrary, and still need to create the tabs for the app; how to find the joy in coding? 
//12.07.2025 Another day goes by...
//12.08.2025 Another day...
//12.09.2025 How to deal with tasks and relationships in a high quality, low stress, and fast way?
//12.10.2025 Flip a coin?
//12.12.2025 Need to sign up for Stanford classes and add two more tabs tomorrow
//12.13.2025 Need to sign up for Stanford classes, add two more tabs, and complete five more companies tomorrow
//12.14.2025 Completed five more companies, signed up for Quantum Mechanics for Scientists and Engineers, and still need to complete two more tabs. Tasks tomorrow: complete five more companies and complete two tabs
//12.15.2025 Completed five more companies, still need to complete two tabs
//12.16.2025 Same story again, completed five more companies, still need to complete two tabs
//12.17.2025 Why is it so hard to keep doing things consistently while traveling? Did not complete five company analysis or code today
//12.18.2025 It's very hard to do work on the go, as of today, I owe 10 company analyses and two days of coding
//12.19.2025 As of today I owe 15 company analyses and 3 days of coding
//12.20.2025 As of today I owe 20 company analyses and 4 days of coding
//12.21.2025 As of today I owe 25 company analyses and 5 days of coding
//12.22.2025 As of today I owe 30 company analyses and 6 days of coding
//12.23.2025 As of today I owe 35 company analyses and 7 days of coding
//12.24.2025 It's Christmas Eve today, and I owe 40 company analyses and 8 days of coding
//12.25.2025 It's Christmas day today, and I owe 45 company analyses and 9 days of coding
//12.26.2025 As of today I owe 50 company analyses and 10 days of coding
//12.27.2025 As of today I owe 28 (50-27+5) company analyses
//12.28.2025 As of today I owe 19 (28-14+5) company analyses
//12.29.2025 As of today I owe 9 (19-15+5) company analyses
//12.30.2025 I finished my AI company analyses today, back to coding tomorrow
//12.31.2025 It is New Year's Eve, back to coding today
//01.01.2026 It is a New Year, filling out GSB application today and iterating home tab
//01.02.2026 Iterating GSB app and helped mom - time goes by so fast
//01.03.2026 It is the 3rd already, wow, working on GSB app, will finish writing both essays
//01.04.2026 Finish GSB app
//01.05.2026 Angela's birthday, GSB app in progress still, the WMM most essay is very difficult to write well
//01.06.2026 Super busy day, 5:25a-11:00p, went to HBS breakfast, listed to GSB MSx presentation, finalized accounting for November, cancelled plastic surgery appointment, started Henkel slides, but did not complete the most important task which are the GSB essays
//01.07.2026 Missed the Round 1 GSB deadline
//01.08.2026 Met with Jerry Wu today and reformatted Henkel slides for Boost Engines
//01.09.2026 Need to finish GSB essays, Henkel slides, and think about Halluminate opportunity
//01.10.2026 Completed 70% of Henkel slides
//01.11.2026 Called Iris Duong, met with Shihao Cao, catch up on Henkel presentation, and had Angela's 22nd birthday dinner with dad today
//01.12.2026 Worked on Henkel presentation and got Opzelura prescription finalized (applied and received $0 copay and should arrive on Friday, January 16th)
//01.13.2026 Flying to LA to meet with Henkel
//01.14.2026 Presented to Henkel today
//01.15.2026 Flew back to the Bay today
//01.16.2026 Saw Eric Schmidt, had dinner with Jerry, and met with Sean today
//01.17.2026 Grandpa Merkle passed away today; dropped Angela off at the airport for her final undergraduate semester
//01.18.2026 Shot balls at the range with Sophia, finalized work trial with Jerry, and took redeye to Palm Beach
//01.19.2026 Arrived at Roger's 2026 Founders Summit today, and met with !Athena but Samantha
//01.20.2026 Day two of Roger's conference, learned that I will need to fly to Arizona to help Matt after the conference
//01.21.2026 Day three of Roger's conference, called Maverick and Rob, and had dinner with Kush
//01.22.2026 Crashed at Ross' apartment in Brickell last night and flew to Arizona to help mom and Matt today
//01.23.2026 Second day in Phoenix, it's heartwrenchingly joyous to know that grandpa Merkle lived an incredible life right to the very end and that he was loved by so many
//01.24.2026 Third day in Phoenix, got the UHaul today and packed some of the boxes into the truck, got dinner with John and Diane (very nice people) at Texas Roadhouse, the Prime Rib and Sweet Potato (with Cinnamon and Brown Sugar) was amazing
//01.25.2026 Introduced Sean and Noah yesterday, flew back to the Bay today
//01.26.2026 Starting working with Halluminate today and went to the Quantum Computing Panel at the British Consulate where I saw Jen from Cambridge again
//01.27.2026 Second day at Halluminate, started outreach today to SMEs and strategy docs, got my prescriptions refilled today and completed HBS financial aid calculator
//01.28.2026 Third day at Halluminate: received 13 models from Arielle and helped rank 18 models from Tom; did my blood draw in the morning, helped Matt move and list the extra table, picked up my prescriptions, and had dinner with Ariana
//01.29.2026 Fourth day at Halluminate: called Ryan Diebner for data rooms, learned more about Rob's siblings, and started a short Horizon problem; saw Dean Walsh in the Bay and called David Yun
//01.30.2026 Fifth day at Halluminate, completed first week and did three short Horizon problems today; met Iris Duong for hot chocolate after
//01.31.2026 Last day of January 2026, wow that went by fast, spent a lot of money this month (~4,000) but went to LA, Palm Beach, and Arizona, and started with Halluminate and got my HBS financial aid - next month I need to finish GSB and my ADHD check
//02.01.2026 First day of February: got breakfast @ Country Inn with Matt, called grandma but she was mostly sleeping, sold the 48 inch LG OLED TV, coordinated golf cart sale interaction between John and Joel, set Matt up on Facebook Marketplace, went grocery shopping with mom, ate dinner @ Haidilao with mom
//02.02.2026 Free schedule today, for the first time in a long while, it felt very nice to know that there was no way to fail the day, tomorrow back to the scheduled programming
//02.03.2026 Back to programming today: joined HBS Apartment and Residence Hall Zoom webinars, hung paintings with Matt, called the credit bureaus, and read HBS' Sequoia case study; realized that at home I am being asked to do so many small things mostly by Matt and sometimes by mom that I have no time to do what I need to do for myself, I must leave the house to do that
//02.04.2026 Hung a few paintings today with Matt, reviewed personal accounting and paid off Chase Reserve
//02.05.2026 Went by Davenport beach today and wrote first draft of WMM
//02.06.2026 Spoke with Philip, founder of Absurd AI, today, did 2.5 hours of work for Boosted.AI, and learned about retroactive forbearance and disputing delinquencies
//02.07.2026 Had a no failures day, reviewed and submitted Boosted.ai work, did laundry and set up additional Chase Zelle for Chase account with mom, ate both rounds of Caprylic Acid + Cod Fish Oil supplements along with Apple Cider Vinegar before dinner and night time supplements, had dinner at Senro Sushi (it was not good)
//02.08.2026 Went to the GSB in the morning for a workshop, called grandma but the iPad faced a connection issue where the audio wasn't being transmitted through (I couldn't hear them and they couldn't hear or see me), watched the Super Bowl via Peacock, found an ADHD diagnosis site (Circle Medical), swapped Zelle email for mom's Chase account, and resubscribed to BrailleWear Turbotax using new company Chase debit card
//02.09.2026 Called San Jose City four times with nobody answering the phone so sent them an email about Bonsai Capital's dissolution instead, cancelled Peacock membership, won an ARAM Mayhem as Kalista and clutched an Arena game as Sett with a last minute 67 HP double kill W, and went to the gym with Matt
//02.10.2026 Called San Jose City today and spoke with Esmeralda Ochoa who confirmed that my tax request has been withdrawn, dropped off the waterproof Kodak film camera at Foto Express to be developed, played a Tahm Kench ARAM Mayhem game, took both doses of Caprylic Acid and Cod Liver Oil between meals, Apple Cider Vinegar before dinner, and Magnesium, Cortisol Manager, Probiotic, GlutAloeMine, and Creatine before bed
//02.11.2026 Received the work trial brief from Philip today, he is only offering $50 per hour which will not work given the opportunity cost, called cousins to confirm they received the gifts, watched the Winter Olympics free dance program (one of two dances that comprise the total score for figure skating), and took all supplements as well as Cod Liver Oil, but forgot to push to Git
//02.12.2026 Uneventful day, made Hamburgu steak for dinner
//02.13.2026 Finished Caprylic Acid supplement today, went grocery shopping at Cupertino Whole Foods (~$440), and watched Ilia Malinin place 8th in the 2026 Winter Olympics
//02.14.2026 Valentines day today, had Dim Sum brunch with dad, started 2025 taxes with mom at H&R Block, and got Izumi revolving sushi at Oakridge for dinner with mom and Matt, then watched the Olympics where Jordan Stolz won gold for men's 1000m speed skating
//02.15.2026 Ate oatmeal for the first time today, called grandma, and caught up with Rishi
//02.16.2026 Today is Chinese New Year eve, I emailed 舅爷爷, declogged the HP printhead black ink nozzle, and skinned and cut carrots and celery
//02.17.2026 Today is Chinese New Year, I dropped mom off for work because the BMW i4 needs to charged, Dr. Gignac canceled our naturopathic appointment tomorrow as she is under the weather, purchased and deposit Roth IRA check into Fidelity, and called Luke Ledva
//02.18.2026 Very rainy day today, mom did not have work today, mom and I went to Oakridge to charge the BMW i4 beside Bank of America where it took 30 minutes and cost $40 for 210 miles of range, mom and I then bought some groceries at Ranch 99, called BoostEngine for fundraising and met Boyuan who is an outsourced CFO and moved from San Jose to Newark, Fremont, and made russian stew after dinner
//02.19.2026 Very rainy day again today with a five minute session of hail, returned HP ink cartridges and sprouted potatoes at whole foods, make Russian Cabbage Beef Stew, and called grandma to wish her a happy Chinese New Year (she remembered who I was today and was talkative, the nurse, Cody, was also extremely nice and held the iPad up to her for me), watched the Winter Olympics after mom got home and saw US women's hockey win gold
//02.20.2026 How is it February 20th already? Had lunch at CRV already where we ate Tartine Manufactory and I met Nadine, Ethan, Aarash, and Regina, I then went to work at the Silvercreek Starbucks (like old times) and went home for dinner and watched the Winter Olympics
//02.21.2026 Had a relatively fun day but did not perform well today, arrived at Becca's apartment for CNY potluck at 7:20p (was 20 minutes late) and then arrived at Sean's party at 10:00p (was 1.5 hours late) and then arrived home at 1:00a (was 1 hour late), and forgot to push to Git; lessons learned are to stay vigilant and set alarms on my phone for 15 minutes before I need to depature to stay on time
//02.22.2026 Called grandma (she did not want to chat today) and relaxed
//02.23.2026 Called the Naturopathic office to confirm supplements, did laundry, installed the new HP ink cartridges which had some printing issues at first but then fixed itself after running the printhead cleaning program, installed the new Pentair R50-BB filter for the water running into the house (need to remember to turn off the water first so there isn't an explosion of water to cause a flood), and confirmed with Mrs. Kim the visit at Valley tomorrow
//02.24.2026 Went to Valley today (first time in a year) and spoke at the Incubator class where I saw three companies: Peer-to-Peer Tutoring Platform, Magnetic Key Switch Keyboard, and Agentic Workflow Platform, called David for nearly three hours, scheduled my ADHD diagnostic, continued my 2025 tax return with mom and tallied flights for 2025, and ate Olive Garden for dinner
//02.25.2026 Had a really slow morning today, then faced technical difficulties when trying to join the Circle Medical appointment, picked up Matt's dry cleaning, went to the gym, went in the sauna, and listened to Tyson's TALK today (an incredible talk, conveyed well, told like a story, and revealed a beautiful and related arc about him; we are more similar than I thought)
//02.26.2026 Had my first appointment for my ADHD diagnostic journey today with Dr. Elisa Horta (will have a follow up with her on March 6th), got through all the emails I received today and caught up on the ones I received yesterday, purchased Whoop membership through my Chase Sapphire Reserve card and should get $359 back in credit by March 12th, Ross Johnson landed in the Bay today, and picked up the repaired painting and frame from Willow Glen
//02.27.2026 Went through my emails and news today first thing in the morning (took two hours), and then went to meet Kunal at GSB (he gave very good, real, honest advice), worked out my personal finances in CoHo and met Greg Rodgers, and drove up to Nob Hill to get a drink with Sam Jacob who is now at AfterQuery
//02.28.2026 Went to brunch with Ross (Johnson) today and met Matthew Zhang (founding engineer at Flint), Ross also introduced me to Sam Tigistu (SWE @ Microsoft) who went to Gunderson HS, had SGD Tofu with mom for dinner
//03.01.2026 How is it March already? Got matcha with Santiago Hernandez and Alex Woelkers today which was accompanied by a diverse and fun conversation that went on for three hours, called grandma (she was not in a talkative mood today), and matched my Chase Sapphire Reserve February statement to my expense tracking sheet (had a record low spending month of $469.23)
//03.02.2026 It's Monday again, called GS Health Center today to obtain the wellness report for 2025, measured my Blood Pressure and Heart Rate, and called Manhattan Cardiology to obtain my previous Blood Pressure measurement from January and February 2024, went to the gym and did my laundry
//03.03.2026 Another day has gone by, I feel like everyday goes by so quickly and I get nothing done, woke up in the morning and ate breakfast (~1 hour), then sent release forms to Weill Cornell and Manhattan Cardiology (~1 hour), followed by two League of Legends games (~1 hour) and called Sam of AfterQuery (~30 minutes), then went to the gym and got through my emails (~3.5 hours), then ate dinner (~ 2 hours) and the day is over again, did not do my Harvard tasks or write my essays
//03.04.2026 Spent mom's day off with her, got lunch @ Lee Garden with her Suzhou high school fellow alumnus who are running an end-to-end turnkey QA testing business for integrated hardware products (the names of the alumnus are Mr. Jack Chen, who is the connector, and Mr. Sun, who runs the business), then we went grocery shopping at Whole Foods (spend ~$320), purchased an All-Clad copper core stainless steel pot at William Sonoma, and had dinner at Joey's Valley Fair (it was ok)
//03.05.2026 Semi-productive day today, woke up and ate chia pudding and made eggs, then fixed the filtered and hot water faucets along with the food incinerator (the plug into the outlet came loose and there was a tripped switch on the fuse box), then I watched the HBS New Ventures Competition (~4 teams per track, one $75,000 winner prize and one $25,000 prize per track), did my HBS Economics for Managers and Financial Accounting Diagnostics
//03.06.2026 Finished my HBS diagnostic CORe's today (Manager's Economics, Financial Accounting, and Excel) and scored 15/15, 14/15, and 14/15 respectively, should have gotten 15/15 on all of them, then went and received a Chinese massage treatment for my nasal polyps, had pork rib soup and leftover Russian soup for dinner with mom
//03.07.2026 Met Eric Ding for Philz coffee today (it was nice catching up with him and felt very familial and fun), then went to get HydraFacial and TempSure treatment from Serena, followed by some light grocery shopping (for bamboo shoots and inflammation reducing herbal root mixture) at Marina, and met with Mrs. Kim for coffee (where she was checking on me to see if I was ok), shredded carrots and cut celery, did laundry, and ate dinner with mom
//03.08.2026 Slow Sunday, ate breakfast (steamed eggs with chia pudding), did laundry, took out the trash, finished GSB essays first draft and sent to Tyson, completed two HBS items, emailed Naturopathic doctor (Dr. Caitlin Gignac) and drafted email for Professor Kingra
//03.09.2026 Half completed a lot of tasks today: GS California tax payment (was paid because a California mailing address was put), 401(k) rollover from GS to Fidelity (to be completed at the end of April once the fixed contribution is made), paid Angela for her work for 2025, called Sam Jung @ AfterQuery, tomorrow will work on GSB essays, and Wednesday (03.11.2026) will start HBS financial aid and submit annual checkup to Circle Medical
//03.10.2026 Gave myself the entire day to work on GSB's two essays, went for a 40 minute walk, and had dinner at Miyakko with mom
//03.11.2026 Mom's day off, she will work for the next 17 days straight, we had breakfast in the back porch, I felt a sensation of appreciation for the day for the first time in a long time, we went to the gym after breakfast and had Poke Bowl for lunch, then I took a first pass at Harvard's financial aid application, and had dinner
//03.12.2026 Got through some emails today, went to a session with mom held by Dan Chang (Ameriprise Wealth Manager) and learned about Direct Indexing and Tax Harvesting, tried to fix the WiFi's lag spikes in the evening
//03.13.2026 Really lazy and unproductive day, could not get out of bed, discovered Pocket AI, texted Kunal, had dinner with mom at SGD Tofu House
//03.14.2026 Drafted email to Paul today, cleaned up GSB essays and wrote the short answers, and went to Sophia's birthday party
//03.15.2026 Called Ryaan Aqid, went to my non-invasive acupuncture appointment, followed by TempSure treatment, then did grocery shopping with mom and had dinner at Mian in Cupertino Main Square
//03.16.2026 Scheduled time with Cornell Ombuds, fixed the WiFi on the desktop today (physically reinstalled the ASUS Wireless Adapter and removed the left antenna solved the problem), and filled out HBS FAFSA
//03.17.2026 Did absolutely nothing today, found the remaining tickets and prices for the trips taken in 2025, drafted email to Paul
//03.18.2026 Called Bruce at Cornell Ombuds today (he was very helpful and understood the Cornell system well, we discussed the university Registrar vs each college's registrar and who exactly to contact), then I cooked breakfast outside and cleaned the outside stove, went to the gym and had dinner with mom at Panera Bread
//03.19.2026 Received my ADHD diagnosis and adderall prescription today, also finished my HBS FAFSA, and my 2025 tax return (should be getting $3,155 back from Federal and New York State), charged the BMW with mom and ate dinner at Sanraku, purchased some organic blackberries, blueberries, celery, and bananas at Nob Hill and cut the celery, ended the day by drafting an email to Erin for my transcript
//03.20.2026 Email to Erin Fitzgerald (Cornell SHA Registrar) sent today, drafted emails to Kenneth and Paul today, will submit my HBS financial aid and FAFSA tomorrow alongside my work verification for Goldman and BoostEngines
//03.21.2026 Edited my GSB WMM essay today, then shredded and cut carrots, followed by finishing my laundry, and added my undergraduate student loans to my financial aid application
//03.22.2026 Called grandma today (she was relatively, 5/10, chatty), then emailed Kenneth, and drove to Cupertino for non-invasive acupuncture treatment, followed by exchanging the bruised red mango and avocado oil with a broken seal at Whole Foods (they were very nice about it, did not require a receipt or repurchase), went on a walk with mom and had dinner with mom
//03.23.2026 Called HBS finance office today, scheduled the email to send to Paul, and got through my emails, had dinner with mom and discussed researching asthma cures
//03.24.2026 Fell asleep last night at 6a (did not feel tired until then for some reason), woke up at 10a today (WHOOP shows I slept 2 hrs 4 mins from 6:35a to 9:40a) to revise and email Paul Walker to request the letter of recommendation, took a nap from 12p to 1:30p, woke up and had breakfast then played a game of Arena (I played Soraka and my partner played Zaahen and we won), really started the day at 4p, headed to pick up the Adderall prescription, had In-N-Out for lunch at 5p and arrived at The Plex at 6p, got home at 8p to have dinner with mom
//03.25.2026 Called Harvard University Housing (HUH) today and created my application, called GS HCM and was told to email for pay stubs, had dinner with mom at SGD Tofu House and purchased stool test (arriving March 30th)
//03.26.2026 Spent four hours today trying to figure out the different rewards given during each shopping phase for League of Legends Arena, then called Alex Yang, and called and left a voicemail for Cornell Ombuds, and messaged non-invasive acupuncture therapist, Mr. Wang, for an appointment this weekend
//03.27.2026 Paid off Bilt today, only have Amex to go, walked to Subway for lunch (40 minute round trip), signed Matt's tax return for him based on his email authorization, had dinner with mom at Miyakko
//03.28.2026 Catch up with Brian today (learned a lot about McKinsey comp and benefits, his time at Phia, and the way he looks at the future), the went and worked at the Atherton library patio area, where a hairy caterpillar climbed on my neck and I accidentally swiped it off which killed it, then I went and got gas (it was $5.99 per gallon, but I got a $0.20/gal discount, leading to $91.71 for the entire jeep tank), picked up Poki and dropped it off for mom since she had to work until 9p today
//03.29.2026 Called Fer Cardo (guy from Madrid I met at yacht week) at noon, ate breakfast (chia pudding and steamed eggs), played a game of Arena, went to my non-invasive acupuncture appointment and went grocery shopping at whole foods (three and a half hour round trip), then ate dinner with mom at home
