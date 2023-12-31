import React from 'react';
import Components1 from './Components1';
import Addcomponents from './Addcomponents';
class Components extends React.Component {
    state = {
        arrayJobs: [
            { id: '1', title: 'deverloper', salary: '500' },
            { id: '2', title: 'deverloper', salary: '400' },
            { id: '3', title: 'deverloper', salary: '300' }
        ]
    }

    // truyền function từ cha sang con bằng props

    addnewJob = (job) => {
        

        console.log('check job', job)
        // let currentJobs = this.state.arrayJobs
        // currentJobs.push(job)
        this.setState({
            arrayJobs: [...this.state.arrayJobs, job]
            // arrayJobs: currentJobs
        })
    }

    deleteJob = (job) => {
        let currentJobs = this.state.arrayJobs;
        currentJobs = currentJobs.filter(item => item.id !== job.id)
        this.setState({
            arrayJobs: currentJobs
        })
    }
   
    componentDidMount() {
        console.log('>>>>> run copmponent did mount')
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('>> run diddupcate: , prev state', prevState, 'current', this.state)
    }

    render() {
        console.log('>>> call render', this.state)

        return (
            <>
                <Addcomponents 
                addnewJob={this.addnewJob} 
                /> 

    
                  
                <Components1 
                abc={this.state.arrayJobs} 
                deleteJob={this.deleteJob}
                />
                
            </>
        )
    }
}



export default Components;



