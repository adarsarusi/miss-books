export const eventBus = _createEventEmitter(_defaultHandler)
    
export function showSuccessMsg(txt) {
    eventBus.emit('user-msg', { txt, type: 'success' })
}

export function showErrorMsg(txt) {
    eventBus.emit('user-msg', { txt, type: 'error' })
}

function _createEventEmitter(defaultHandler = null){
    const listenersMap = {}
    window.listenersMap = listenersMap      // Easy debug from console

    return {
        on(evName, listener){
            listenersMap[evName] = 
                listenersMap[evName] ? [ ...listenersMap[evName], listener ] : [ listener ]

            return () => 
                listenersMap[evName] = 
                    listenersMap[evName].filter(func => func !== listener)
        },
        emit(evName, payload){
            if(listenersMap[evName]) listenersMap[evName].forEach(listener => listener(payload))
            else if(defaultHandler) defaultHandler(evName, payload)
        }
    }
}

// const listenerMap = {
//     'user-msg': [foo, goo],
//     'baba': [mama]
// }

function _defaultHandler(evName, payload) {
    console.groupCollapsed('No handler found')
    console.log(`event - %c${evName}`, 'color: orange')
    console.log(`payload - %c${payload}`, 'color: orange')
    console.groupEnd()
}

// Easy debug from console
window.eventBus = eventBus