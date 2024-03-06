import { withApollo } from 'lib/apollo/withApollo'
import NavBar from '../NavBar/NavBar'
import PersonalizationCard from '../PersonalizationCard'
import withAuth from 'hocs/withAuth'

const Settings = () => {
  return (
    <div>
      <NavBar />

      <div className='mt-[24px] md:mt-[100px] flex justify-center'>
        <PersonalizationCard />
      </div>
    </div>
  )
}

// export default Settings
export default withApollo()(withAuth(Settings))
