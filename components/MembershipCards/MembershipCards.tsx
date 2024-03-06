import React from 'react'
import BasicMembershipCard from '../BasicMembershipCard'
import PremiumMembershipCard from '../PremiumMembershipCard'
import useStripeMembershipPlans from 'hooks/memberships/stripeMembershipPlans'
import { withApollo } from 'lib/apollo/withApollo'
import Spinner from '../Spinner'

const MembershipCards = () => {
  const [membershipPlans, loadingMembershipPlans] = useStripeMembershipPlans()

  //@ts-ignore
  const basicMonthlyPlan = membershipPlans?.filter((plan: any) => plan.name === 'Basic-Monthly')

  //@ts-ignore
  const basicYearlyPlan = membershipPlans?.filter((plan: any) => plan.name === 'Basic-Annual')

  //@ts-ignore
  const premiumMonthlyPlan = membershipPlans?.filter((plan: any) => plan.name === 'Premium-Monthly')

  //@ts-ignore
  const premiumYearlyPlan = membershipPlans?.filter((plan: any) => plan.name === 'Premium-Annual')

  if (loadingMembershipPlans) {
    return <Spinner />
  }

  return (
    <div className='mt-[128px] w-full flex flex-col md:flex-row md:justify-between md:flex-wrap gap-y-[170px]'>
      <div className='w-full md:w-[49%]'>
        <BasicMembershipCard monthlyPlan={basicMonthlyPlan} yearlyPlan={basicYearlyPlan} />
      </div>
      -
      <div className='w-full md:w-[49%]'>
        <PremiumMembershipCard monthlyPlan={premiumMonthlyPlan} yearlyPlan={premiumYearlyPlan} />
      </div>
    </div>
  )
}

export default withApollo()(MembershipCards)
