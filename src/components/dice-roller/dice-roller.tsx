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

    function handleNum1(e: any, num: number) {
        console.log(e)
        console.log(num)
        setNum1(num);
    }

    function handleNum2(e: any, num: number) {
        console.log(e)
        console.log(num)
        setNum2(num);
    }

    function handleMods(e: any, num: number) {
        console.log(e)
        console.log(num)
        setMods(num);
    }

    function handleDiff(e: any, num: number) {
        console.log(e)
        console.log(num)
        setDiff(num);
    }

    function handleHunger(e: any, num: number) {
        console.log(e)
        console.log(num)
        setHunger(num);
    }

    function handleDiceRoll(event: any, num1: number, num2: number, mods: number, hunger: number) {
        event.preventDefault();
        let total = num1 + num2 + mods - hunger
        console.log(total)
        setDiceTotal(total + hunger)


        let rolledDiceArray = [];
        for (let i = 0; i < total; i++) {
            rolledDiceArray.push(Math.floor(Math.random()
                * 10) + 1);
        }

        let rolledHungerArray = [];
        for (let i = 0; i < hunger; i++) {
            rolledHungerArray.push(Math.floor(Math.random()
                * 10) + 1);
        }

        setRolledDice(rolledDiceArray);
        setRolledHunger(rolledHungerArray);
    }

    function countPairs(ar: number[]) {
        var obj: number[] = [];

        ar.forEach(item => {
            obj[item] = obj[item] ? obj[item] + 1 : 1;
        });

        return Object.values(obj).reduce((acc: number, curr: number) => {
            acc += Math.floor(curr / 2)
            return acc;
        }, 0);
    }

    function arrCompare(arr1: number[], arr2: number[]) {

        var ret = [];
        arr1.sort();
        arr2.sort();
        for (var i = 0; i < arr1.length; i += 1) {
            if (arr2.indexOf(arr1[i]) > -1) {
                ret.push(arr1[i]);
            }
        }
        return ret;
    }


    return (

        <>
            <div>Dice Roller</div>
            <div className="statsContainer">
                <div className="stats">
                    <div>Attribute/Skill: {num1}</div>
                    <div>Attribute/Skill: {num2}</div>
                    <div>Modifiers: {mods}</div>
                    <div>Hunger: {hunger}</div>
                    <div>Difficulty: {diff}</div>
                    <div>Dice Pool: {diceTotal}</div>
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

                ).length) >= diff &&

                <div>
                    Successes!({rolledDice.filter((num) =>
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

                ).length) < diff &&

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



            <form action="">
                <div>
                    <label htmlFor="attribute">Attribute/Skill</label>
                    <input type="number" value={num1} onChange={(e) => handleNum1(e, e.target.valueAsNumber)}></input>
                </div>
                <div>
                    <label htmlFor="skill">Attribute/Skill</label>
                    <input type="number" value={num2} onChange={(e) => handleNum2(e, e.target.valueAsNumber)}></input>
                </div>
                <div>
                    <label htmlFor="mods">Modifiers</label>
                    <input type="number" value={mods} onChange={(e) => handleMods(e, e.target.valueAsNumber)}></input>
                </div>
                <div>
                    <label htmlFor="hunger">Hunger</label>
                    <input type="number" value={hunger} onChange={(e) => handleHunger(e, e.target.valueAsNumber)}></input>
                </div>
                <div>
                    <label htmlFor="difficulty">Difficulty</label>
                    <input type="number" value={diff} onChange={(e) => handleDiff(e, e.target.valueAsNumber)}></input>
                </div>
                <button type="submit" onClick={(e) => handleDiceRoll(e, num1, num2, mods, hunger)}>Roll</button>
            </form>
        </>
    )
}