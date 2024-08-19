import React from 'react'
import JobListing from '../components/JobListing';
import JobListings from '../components/JobListings';

function JobPages() {
  return (
    <section className="bg-blue-50 px-4 py-6">
        <JobListings isHome = {false}/>
    </section>
  )
}

export default JobPages;