import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Correct from '../components/Correct';
import Wrong from '../components/Wrong';
import questions from "../store/questions.json"
import { useMediaQuery } from 'react-responsive'
import Axios from 'axios'

function Game() {
    const [id, setId] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [points, setPoints] = useState(0);
    const [selectedAnswer, setSelectAnswer] = useState("");
    const isMobile = useMediaQuery({ maxWidth: 890 })
    const [name, setName] = useState('')
    const [allUser, setAllUsers] = useState('')

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const submitReview = () => {
        Axios.post('http://localhost:3001/api/insert', {
            name: name,
            score: points
        }).then(() => {
            alert('successful insert')
        })
    }
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            console.log(response.data)
        })
    }, [])
    // Generate questions in random orders
    // const generateRandomArray = () => {
    //     var numbers = []
    //     var min, max, r, n, p;
    //     min = 0;
    //     max = questions.length - 1;
    //     r = questions.length

    //     for (let i = 0; i < r; i++) {
    //         do {
    //             n = Math.floor(Math.random() * (max - min + 1)) + min;
    //             p = numbers.includes(n)
    //             if (!p) {
    //                 numbers.push(n)
    //             }
    //         }
    //         while (p);
    //     }
    //     return numbers;
    // }

    // useEffect(() => {
    //     const copy = [...questions];
    //     while (copy.length) {
    //         const ndx = Math.random() * copy.length | 0;
    //         const elem = copy.splice(ndx, 1)[0];
    //         setNewId(newId.push(elem))
    //     }
    //     // console.log(arr);
    //     // arr.map((a) => {
    //     //     setNewId(newId.push(a.id))
    //     // })
    // }, [])

    //reset all variables
    useEffect(() => {
        setCorrectAnswer(false)
        setIsSubmitted(false)
        setSelectAnswer("")
        let i = 0;
        if (id !== questions.length - 1) {
            while (i < 4) {
                document.getElementById(i).classList.remove('highlight')
                i = i + 1;
            }
        }
    }, [id])

    //check if answer is right and change question
    const submitAnswer = () => {
        setIsSubmitted(true)
        if (selectedAnswer === questions[id].answer) {
            const obj = document.getElementById("value");
            animateValue(obj, points, points + 50, 1000);
            setPoints(points + 50)
            setCorrectAnswer(true)
        } else {
            if (points !== 0) {
                const obj = document.getElementById("value");
                animateValue(obj, points, points - 25, 1000);
                setPoints(points - 25)
            }
            setCorrectAnswer(false)
        }
        if (id < questions.length - 1) {
            setTimeout(() => {
                setId(id + 1)
            }, 1000)
        }
    }

    const preSelectAnswer = (prop, index) => {
        setSelectAnswer(prop)
        let i = 0;
        while (i < 4) {
            if (i === index)
                document.getElementById(i).classList.add('highlight')
            else
                document.getElementById(i).classList.remove('highlight')
            i = i + 1;
        }

    }
    console.log(name)
    return (
        <div style={{ height: '100vh', overflow: 'hidden', padding: '0 20px 0 20px' }} className='center-simple'>
            <div style={{ overflow: 'hidden' }} className='center-simple-col'>
                {correctAnswer && isSubmitted && <Correct />}
                {!correctAnswer && isSubmitted && <Wrong />}
                <div className='center-simple'>
                    <h2>POINTS: </h2>
                    <h2 style={{ width: '100px', textAlign: 'center', color: '#d80032' }} id="value">{points}</h2>
                </div>
                <div className='center-simple'>
                    <h2>Question n°{id + 1}</h2>
                </div>
                {id !== questions.length - 1 ?
                    <div className='center-simple-col'>
                        <div className='center-card center-simple-col'>
                            {isMobile ? <p>{questions[id].question}</p> : <h3>{questions[id].question}</h3>}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%' }}>
                                {questions[id].propositions.map((prop, index) => {
                                    return (
                                        <button id={index} style={isMobile ? { flex: '1 0 50%' } : { flex: '1 0 33%' }} className='btn-outline' key={index} onClick={() => preSelectAnswer(prop, index)}>{prop}</button>
                                    )
                                })}
                            </div>
                            <div style={{ width: '100%', height: '50px' }} className='center-simple'>
                                {!selectedAnswer ? <button style={{ width: '100%' }} className='btn-disabled'>Choose answer</button> : <button className='btn' style={{ width: '100%' }} onClick={submitAnswer}>{selectedAnswer}</button>}
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <h2 style={{ textAlign: 'center' }}>Congrats, you finished the Quizz</h2>
                        <input type='text' name='name' placeholder='name' onChange={(e) => {setName(e.target.value)}} />
                        <button onClick={submitReview} className='btn-outline'>submit</button>
                        <NavLink to="/"><button className='btn'>Return to main menu</button></NavLink>
                    </>
                }
            </div>
        </div>
    )
}

export default Game