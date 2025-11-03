import {Header, Lead, Image} from "./Template";
import '../../index.css';


const Tb2 = () => {
  return (
    <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-zinc-900 antialiased">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <Header title="Classifier for Tension Board 2"/>
                <Lead description="The tension board 2 is a training board that allows climbers all over the world to set and share their own climbs for others to try. Due to the climbs on the board being user set, there can be inconsistencies with grades. I built a neural-network to solve this."/>
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
            <Image src="/images/tb2/tb2climber.jpg" caption="Climber climbing on the TB2 Mirror layout"/>
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
        <h2>Data Preperation</h2>
    )
}

export default Tb2;