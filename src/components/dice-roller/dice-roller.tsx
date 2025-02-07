import { useState } from "react"
import './dice-roller.scss'

export default function DiceRoller() {
    const [num1, setNum1] = useState(Number);
    const [num2, setNum2] = useState(Number);
    const [mods, setMods] = useState(Number);
    const [hunger, setHunger] = useState(Number);
    const [diff, setDiff] = useState(Number);
    const [diceTotal, setDiceTotal] = useState(Number);
    const [rolledDice, setRolledDice] = useState<number[]>([])
    const [rolledHunger, setRolledHunger] = useState<number[]>([])
    const [rouse, setRouse] = useState(Number);

    function handleNum1(num: number) {

        console.log(num)
        setNum1(num);
    }

    function handleNum2(num: number) {

        console.log(num)
        setNum2(num);
    }

    function handleMods(num: number) {

        console.log(num)
        setMods(num);
    }

    function handleDiff(num: number) {

        console.log(num)
        setDiff(num);
    }

    function handleHunger(num: number) {

        console.log(num)
        setHunger(num);
    }

    function handleDiceRoll(event: React.MouseEvent<Element, MouseEvent>, num1: number, num2: number, mods: number, hunger: number) {
        event.preventDefault();
        if (rouse > 0) {
            setRouse(0);
        }
        console.log(event);
        const total = num1 + num2 + mods - hunger
        console.log(total)
        setDiceTotal(total + hunger)


        const rolledDiceArray = [];
        for (let i = 0; i < total; i++) {
            rolledDiceArray.push(Math.floor(Math.random()
                * 10) + 1);
        }

        const rolledHungerArray = [];
        for (let i = 0; i < hunger; i++) {
            rolledHungerArray.push(Math.floor(Math.random()
                * 10) + 1);
        }

        setRolledDice(rolledDiceArray);
        setRolledHunger(rolledHungerArray);
    }

    function countPairs(ar: number[]) {
        const obj: number[] = [];

        ar.forEach(item => {
            obj[item] = obj[item] ? obj[item] + 1 : 1;
        });

        return Object.values(obj).reduce((acc: number, curr: number) => {
            acc += Math.floor(curr / 2)
            return acc;
        }, 0);
    }

    function arrCompare(arr1: number[], arr2: number[]) {

        const ret = [];
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < arr1.length; i += 1) {
            if (arr2.indexOf(arr1[i]) > -1) {
                ret.push(arr1[i]);
            }
        }
        return ret;
    }

    function handleRouse(event: React.MouseEvent<Element, MouseEvent>) {
        event.preventDefault();
        clear();
        let rouse = Math.floor(Math.random()
            * 10) + 1

        setDiceTotal(1);

        setRolledDice([rouse]);

        setRouse(rouse);
    }

    function handleClear(event: React.MouseEvent<Element, MouseEvent>) {
        event.preventDefault();
        clear();
    }

    function clear() {
        setNum1(0);
        setNum2(0);
        setMods(0);
        setHunger(0);
        setDiff(0);
        setDiceTotal(0);
        setRolledDice([]);
        setRolledHunger([]);
        setRouse(0);
    }

    function handleWillpowerReroll(event: React.MouseEvent<Element, MouseEvent>) {
        event.preventDefault();

        // let rerollPool = rolledDice.filter((num) =>
        //     num < 6
        // )

        let diceToBeRerolled: number[] = [];

        rolledDice.forEach(item => diceToBeRerolled.push(item))

        const filterCondition = (num: number) => num < 6;

        const filteredIndices = diceToBeRerolled
            .map((element, index) => (filterCondition(element) ? index : -1))
            .filter((index) => index !== -1);

        // rerollPool.forEach((item, index) => {
        //     console.log(item, index - 1)
        // })

        let indexsToReplace: number[] = filteredIndices



        let trimmedIndexes = indexsToReplace.splice(0, 3);

        trimmedIndexes.forEach((element) => {
            console.log(element);
            let rerolledNum = Math.floor(Math.random()
                * 10) + 1
            diceToBeRerolled[element] = rerolledNum;
        })

        console.log(diceToBeRerolled)

        setRolledDice(diceToBeRerolled);
    }


    return (

        <div className="diceRollContainer">
            <div>Dice Roller</div>
            <div className="statsContainer">
                <div className="stats">
                    <div>Attribute/Skill: {num1}</div>
                    <div>Attribute/Skill: {num2}</div>
                    <div>Modifiers: {mods}</div>
                    <div>Hunger: {hunger}</div>
                    <div>Difficulty: {diff}</div>
                    <div>Dice Pool: {diceTotal}</div>
                    <div>Rouse: {rouse}</div>
                </div>
            </div>


            <div className="dieBreakdown">
                <div className="dieSet">
                    <div>Dice:</div>
                    <div className="rolls">
                        {rolledDice.map((die: number, index: number) => {
                            return (<div key={index}>{die}</div>
                            );
                        })}
                    </div>
                </div>
                <div className="dieSet">
                    <div>Hunger:</div>
                    <div className="rolls">
                        {rolledHunger.map((die: number, index: number) => {
                            return (<div key={index}>{die}</div>
                            );
                        })}
                    </div>
                </div>
            </div>




            {
                (rolledDice.filter((num) =>
                    num >= 6

                ).length + rolledHunger.filter((num) =>
                    num >= 6

                ).length) >= diff && (rolledDice.length + rolledHunger.length) > 0 &&

                <div>
                    {diff > 0 && <span>Successes!</span>}

                    {
                        (rolledDice.filter((num) =>
                            num >= 6

                        ).length + rolledHunger.filter((num) =>
                            num >= 6

                        ).length) > diff &&

                        <span>
                            {diff == 0 && (rolledDice.filter((num) =>
                                num >= 6

                            ).length + rolledHunger.filter((num) =>
                                num >= 6

                            ).length) > diff && "Successes!"}
                        </span>
                    }
                    <span>
                        {
                            diff == 0 && (rolledDice.filter((num) =>
                                num >= 6

                            ).length + rolledHunger.filter((num) =>
                                num >= 6

                            ).length) == 0 && (rolledDice.length + rolledHunger.length) > 0 &&


                            "Failure!"

                        }
                    </span>

                    ({rolledDice.filter((num) =>
                        num >= 6

                    ).length + rolledHunger.filter((num) =>
                        num >= 6

                    ).length + countPairs(rolledDice.concat(rolledHunger).filter((num) =>
                        num === 10

                    )) * 2})




                    <div>
                        {countPairs(rolledDice.concat(rolledHunger).filter((num) =>
                            num === 10

                        )) >= 1 && <div>
                                {arrCompare(rolledHunger.filter((num) =>
                                    num === 10

                                ), rolledHunger.filter((num) =>
                                    num === 10

                                )).length >= 1 && <span>Messy </span>}
                                Crit!</div>}
                    </div>

                </div>




            }



            {
                (rolledDice.filter((num) =>
                    num >= 6

                ).length + rolledHunger.filter((num) =>
                    num >= 6

                ).length) < diff && rolledDice.length + rolledHunger.length > 1 &&

                <div>
                    Failure!({rolledDice.filter((num) =>
                        num >= 6

                    ).length + rolledHunger.filter((num) =>
                        num >= 6

                    ).length})
                </div>
            }
            {
                (rolledDice.filter((num) =>
                    num >= 6

                ).length + rolledHunger.filter((num) =>
                    num >= 6

                ).length) < diff && rolledHunger.filter((num) =>
                    num === 1

                ).length >= 1 &&

                <div>
                    Beastial Failure!
                </div>
            }







            <form action="" className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="attribute">Attribute/Skill</label>
                        <input type="number" min="0" value={num1} onChange={(e) => handleNum1(e.target.valueAsNumber)}></input>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="skill">Attribute/Skill</label>
                        <input type="number" min="0" value={num2} onChange={(e) => handleNum2(e.target.valueAsNumber)}></input>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="mods">Modifiers</label>
                        <input type="number" min="0" value={mods} onChange={(e) => handleMods(e.target.valueAsNumber)}></input>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="hunger">Hunger</label>
                        <input type="number" min="0" value={hunger} onChange={(e) => handleHunger(e.target.valueAsNumber)}></input>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="difficulty">Difficulty</label>
                        <input type="number" min="0" value={diff} onChange={(e) => handleDiff(e.target.valueAsNumber)}></input>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={(e: any) => handleDiceRoll(e, num1, num2, mods, hunger)}>Roll</button>
                    <button onClick={(e: any) => handleWillpowerReroll(e)}>Willpower Reroll</button>
                    <button onClick={(e: any) => handleRouse(e)}>Rouse</button>
                    <button onClick={(e: any) => handleClear(e)}>Clear</button>
                </div>
            </form>
        </div>
    )
}