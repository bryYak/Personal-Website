import { Header, Lead, Image, Code } from "./Template";
import '../../index.css';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';


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
                This library downloads the TB2 dataset as a <b>relational sqlite database</b>. It also has options
                for downloading datasets for other boards, namely Kilter and Moon.
            </p>
            <Image src="/images/tb2/tb2sqlite.PNG" caption="TB2 SQLite DB" />
            <h3>Data Collection</h3>
            <p>
                To access the data for climbs, we need to primarily look at the climb_stats, and climbs tables. Climbs stats contains information, such as benchmark_difficulty, display_difficulty, difficulty_average, (all floats) ascensionist_count, and wall_angle.
                Climbs contains setter_name, climb_name, description (contains matching info), and frames (contains hold info).
            </p>
            <p>
                With data collection, we want to be congniscant of data quality. Due to climbs being user set and unregulated, we want to avoid our initial problem
                grade inconsistency. There are two approaches to this looking at <b>"Classics"</b> and high quality user submitted climbs. "Classics" refer to climbs that
                are hand picked by the staff at Tension that they feel are high quality for that grade. We can assume that by a climb being classic that it is an accurate representation of that grade.
                I initially intended to only use classics for training, however due to there only being about 600 classics, I felt limited by the amount of samples. To alleviate this, I began
                looking at non-classic user submitted climbs. To maintain high quality data, I looked at two variables, user <b>ascents</b> and the difference between <b>difficulty_average </b> (average of all user submitted difficulties) and <b>display_difficulty</b> (difficulty proposed by setter).
                I namely looked at climbs with at least 75 ascents, and where the display and average difficulty differed less than 0.5. I used the below queries to get our data.

            </p>

            <Code file={"/code/tb2/benchmark_query.md"} />
            <Code file={"/code/tb2/nonbenchmark_query.md"} />

            <h3>Processing Frames</h3>
            <p>
                Tension stores their hold info as a frame. In order to train our model we need to convert these
                to a format usable for our neural network. To begin let's look at this frame for a V3 (6a+) called Sunlight for Plants.

            </p>
            <div className="p-2 m-2 text-center bg-gray-950">
                p318r8p333r6p451r6p477r8p552r6p567r8p584r6p611r8p613r5p631r6p682r8p714r8p725r7
            </div>
            <p>
                Each hold in the frame has two parts <b>hold id</b> and <b>hold type</b>. Hold id is an integer ranging from 304 to 801, while hold type
                is an integer ranging from 5 - 8. Each hold on the tension board has a unique id, while hold type describes if the hold is a hand hold, foot hold, start hold, or finish hold.
                We will use these eventually to create our feature vector. The below code snippet is used to create maps that we can use to encode, display and find mirrors for problems.
            </p>

            <Code file={"/code/tb2/frame.md"} />
            <Code file={"/code/tb2/maps.md"} />
            <h4>Mirrors</h4>
            <p>
                In the tension board 2 there are two different layouts - mirror and spray. For the sake of our problem we will be training all our data off the mirror layout.
                The mirror layout, for one, is more commonly used, and thus has a lot more problems set than the spray. Additionally,
                the mirror allows us to take our consistent trainable data, and double it, since every problem has a valid mirror. We can process the mirrors, by
                using the mirror map, which takes an id and output its mirror. Additionally we can use our coordinates map to visualize both of these problems.
            </p>

            <div className="flex">
            <figure className="object-center m-4" >
                <img className="mx-auto w-full" src="/images/tb2/problem.png" alt="" />
                <figcaption className="text-center text-neutral-400 text-sm">{"Sunlight for Plants"}</figcaption>
            </figure>
            <figure className="object-center m-4" >
                <img className="mx-auto w-full" src="/images/tb2/problem_mirror.png" alt="" />
                <figcaption className="text-center text-neutral-400 text-sm">{"Sunlight for Plants (Mirror)"}</figcaption>
            </figure>
            </div>
            <h3>Feature Vector</h3>
        </section>
    )
}

export default Tb2;