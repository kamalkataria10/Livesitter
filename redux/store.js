import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk';
import { overlayReducer } from './overlay/overlay';
import { socketReducer } from './liveServerSocket/liveServerSocket';
import ignoreNonSerializableMiddleware from 'redux-ignore';
const Store = configureStore({
    reducer: {
        overlay:overlayReducer,
        socket:socketReducer
    },
    // middleware: [
    //     // ...getDefaultMiddleware(),
    //     ignoreNonSerializableMiddleware({
    //       ignoredPaths: ['socket.socket'], // Specify the path to ignore
    //     }),
    //   ],
    // middleware: [thunk],
})


export default Store;