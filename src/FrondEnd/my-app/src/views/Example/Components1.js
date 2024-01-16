import React from 'react';
import './Style.scss'
class Components1 extends React.Component {

    state = {
        showjobs: false

    }

    handleshowhide = () => {
        this.setState({
            showjobs: !this.state.showjobs
        })
    }

    handleOnClick = (job) => {
        console.log('>>>>>>>> :', job)
        this.props.deleteJob(job)
    }


   


    render() {
        let { abc } = this.props;
        let { showjobs } = this.state;
        let check = showjobs===true ? 'showjobs = true' : 'showjobs = false';
        console.log('>>> check conditional: ', check)
        return (
            <>
                {showjobs == false ? <div>

                    <button className='button-show' onClick={() => this.handleshowhide()}>show</button>

                </div>
                :
                    <>
                        <div className='job-list'>
                            {
                                abc.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            ({item.title} - {item.salary}) <></> <span onClick={() => this.handleOnClick(item)}>X</span>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    <div><button onClick={() => this.handleshowhide()}>hide</button></div>
                    </>}

            </>
        )
    }
}


// const Components1= (props) => {
//     let { abc } = props
//         let a='';
//         return (
//              <>
//               <div className='job-list'>
//                 {
//                        a= abc.map((item, index) => {
//                         if (+item.salary >=500){
//                             return(
//                                     <div key={item.id}>
//                                     ({item.title} - {item.salary} $)
//                                     </div>
//                             )}
//                         })

//                 }
//                 {console.log('check map array : ', a)}
//                 </div>  
//               </>
//         )
// }
export default Components1;



