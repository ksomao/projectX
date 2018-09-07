const ha = ' hours ago'
const da = ' days ago'

export const calculateDaysLeftUntil = endAt => {
    endAt = new Date(endAt)
    let diff = endAt.getTime() - new Date().getTime()
    return Math.ceil(diff / (1000*60*60*24))
}

export const calculateDaysSince = previousDate => {
    previousDate = new Date(previousDate)
    let diff = new Date().getTime() - previousDate.getTime()
    let numberOfHours = Math.ceil(diff / (1000*60*60))
    return numberOfHours > 24 ? Math.ceil(numberOfHours/24) + da : numberOfHours + ha
}

export const formatDate = dateString => {
    let dateToFormat = new Date(dateString)
    return dateToFormat.getDate() + '-' + (dateToFormat.getMonth() + 1) + '-' + dateToFormat.getFullYear()
}