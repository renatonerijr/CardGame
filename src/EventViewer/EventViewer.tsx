
export const EventViewer = (gameLogic) => {
    gameLogic = gameLogic.gameLogic
    const {eventList, setToEventList} = gameLogic.eventList
    console.log(gameLogic)
    console.log(eventList)
    return (
            <div className="flex flex-col space-y-1 h-full flex-row p-5 bg-white w-4/12 scroll-auto	overflow-auto h-full">
              {
                eventList.map((value, index) => (
                    <div className="container p-6 w-full mx-0 bg-slate-400 rounded-xl shadow-lg flex flex-row">
                        <p className="grow">{value.type}</p>
                        <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {setToEventList(index)}}>／人◕ __ ◕人＼</button>
                    </div>
                ))
              }  
            </div>
    )
}