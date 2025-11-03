import { Header, Lead, Image, Post} from "./Template";
import '../../index.css';


const Tb2 = () => {
    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-zinc-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <Header title="Classifier for Tension Board 2" />
                    <Lead description="The tension board 2 is a training board that allows climbers all over the world to set and share their own climbs for others to try. Due to the climbs on the board being user set, there can be inconsistencies with grades. I built a neural-network to solve this." />
                    {Overview()}
                    {Data()}
                </article>
            </div>
        </main>
    );
};


function Overview() {
    return (
        <section>
            <h2>Problem Overview</h2>
            <p>
                The <b>Tension Board 2</b> is a climbing system board equipped with LED's that can be used by climbers across the world.
                The board comes with a standardized grid of holds that can light up to display custom boulder problems, allow climbers to be shared globally through the Tension app.
                A user can set a climb by choosing a start hold, a finish hold, and various combinations of hand and foot holds. They additionally can specify wall angle,
                as well as if they allow matching (allow both hands on the same hold). Lastly they assign a <b>difficulty grade</b> using the V-scale or font system (bouldering grading scales).
            </p>
            <Image src="/images/tb2/tb2climber.jpg" caption="Climber climbing on the TB2 Mirror layout" />
            <p>
                The tension board 2 is a powerful training tool, with a large variety of climbs for users to try. One of the major hurdles that this board, and similar training boards encounter
                is <b>grade inconsistency</b>. Grades in climbing can be heavily subjective from person to person, depending on reach, strength, or style. Thus a climb
                can feel like a V8 for one person, but V6 for another. As a result grades in system boards can vary widely, making it hard for climbers to measure progress when using these tools.
            </p>

            <p>
                To resolve this problem I developed a <b>regression neural network</b> that can predict the <b>grade</b> of a Tension Board 2 problem.
                The model learned from thousands of different user set problems, and analyzed relationships between holds used and wall angle. The end result was a model
                that could accurately give a grade for set problems, allowing for <b>greater consistency in climbing grades</b>. This allows climber to train more efficiently,
                and accurately.
            </p>
        </section>
    )

}

function Data() {
    return (
        <section>
            <h2>Data Preperation</h2>
            <p>To begin with data preparation, we need to gather our dataset.
                To accomplish this I used the <a className="text-blue-500 underline" href="https://github.com/lemeryfertitta/BoardLib">BoardLib</a> python library.
                This library downloads the TB2 dataset as a <b>relational sqlite database</b>. It also has the options
                for downloading datasets for other boards, namely Kilter and Moon.
            </p>
            <Image src="/images/tb2/tb2sqlite.PNG" caption="TB2 SQLite DB"/>
            <p>
                To access the data for climbs, we need to primarily look at the climb_stats, and climbs tables. Climbs stats contains information, such as benchmark_difficulty, display_difficulty, difficulty_average, (all floats) ascensionist_count, and wall_angle. 
                Climbs contains setter_name, climb_name, description (contains matching info), and frames (contains hold info).
            </p>
            <p>
                With data collection, we want to be congniscant of data quality. Due to climbs being user set and unregulated, we want to avoid our initial problem
                grade inconsistency. There are two approaches to this looking at "Classics" and high quality user submitted climbs. "Classics" refer to climbs that
                are hand picked by the staff at Tension that they feel are high quality for that grade. We can assume that by a climb being classic that it is an accurate representation of that grade.
                I initially intended to only use classics for training, however due to there only being about 600 classics, I felt limited by the amount of samples. To alleviate this, I began
                looking at non-classic user submitted climbs. To maintain high quality data, I looked at two variables, user ascents and the difference between difficulty_average (average of all user submitted difficulties) and display_difficulty (difficulty proposed by setter).
                I namely looked at climbs with at least 75 ascents, and where the display and average difficulty differed less than 0.5. I used the below queries to get our data.

            </p>

            <Post/>

        </section>
    )
}

export default Tb2;