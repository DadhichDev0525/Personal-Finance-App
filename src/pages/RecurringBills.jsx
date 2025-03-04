import React from 'react'
import Panel from '../components/Panel'

const RecurringBills = () => {
  return (
    <div className="w-full p-10">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Overview</h2>
      </div>
      <div className='my-5 '>
        <div className='flex flex-col md:flex-row lg:flex-col gap-5'>
          <Panel className='bg-zinc-800'></Panel>
          <Panel></Panel>
        </div>
        <Panel></Panel>
      </div>
    </div>
  )
}

export default RecurringBills