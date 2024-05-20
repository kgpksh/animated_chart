const subscriptionStatus = {
    'ACTIVE' : 'active',
    'PASTDUE' : 'past_due',
    'CANCELED' : 'canceled',
    'PAUSED' : 'paused',
    'TRAILING' : 'trialing'
}
Object.freeze(subscriptionStatus)

const scheduledAction = {
    'CANCEL' : 'cancel',
    'PAUSE' : 'pause',
    'RESUME' : 'resume'
}
Object.freeze(scheduledAction)

export const SubscriptionStatus = subscriptionStatus
export const ScheduledAction = scheduledAction
