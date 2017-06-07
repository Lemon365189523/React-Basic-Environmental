import React from 'react'
import styles from "./index.less";
export default class App extends React.Component {
    render() {
        console.log(styles)
        return (
            <div className={styles.test}>
                几点睡了房间里撒酒疯
            </div>
        )
    }
}
