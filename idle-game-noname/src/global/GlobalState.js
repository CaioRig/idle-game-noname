import GlobalStateContext from "./GlobalStateContext";
import { useState, useEffect } from "react";
import useGetSeconds from "../hooks/useGetSeconds";

const GlobalState = (props) => {
    const [resourseNumber, setResourseNumber] = useState(0)

    const [resoursePerSecond, setResoursePerSecond] = useState(0)
    const [survivorsQty, setSurvivorsQty] = useState(1)
    const [resoursePerSecondPrice, setResoursePerSecondPrice] = useState(100)

    const [clickUpdates, setClickUpdates] = useState(1)
    const [boughtClickUpdates, setBoughtClickUpdates] = useState(0)
    const [clickUpdatesPrice, setClickUpdatesPrice] = useState(10)

    const second = useGetSeconds()

    const addNumberPerClick = () => setResourseNumber(resourseNumber + clickUpdates)

    const addNumberPerSecond = () => setResourseNumber(resourseNumber + resoursePerSecond)

    const upgradeGatherer = () => {
        setClickUpdates(clickUpdates + 1)
        setResourseNumber(resourseNumber - clickUpdatesPrice)
        setBoughtClickUpdates(boughtClickUpdates + 1)
        setClickUpdatesPrice(clickUpdatesPrice + clickUpdates)
    }
    const upgradeGatherPerSecond = () => {
        setResoursePerSecond(resoursePerSecond + 1)
        setResourseNumber(resourseNumber - resoursePerSecondPrice)
        setSurvivorsQty(survivorsQty + 1)
        setResoursePerSecondPrice(resoursePerSecondPrice + resoursePerSecond)
    }

    useEffect(() => {
        addNumberPerSecond()
    }, [second])

    const globalData = {
        Game: {
            resourseNumber,
            clickUpdatesPrice,
            resoursePerSecondPrice,
            addNumberPerClick,
            addNumberPerSecond,
            upgradeGatherer,
            upgradeGatherPerSecond
        },
        Debugger: {
            resourseNumber,
            resoursePerSecond,
            clickUpdates,
            second,
            clickUpdatesPrice
        }
    }

    return (
        <GlobalStateContext.Provider value={globalData}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState;