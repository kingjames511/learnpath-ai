export interface  OnboardingData {
    interests : string[],
    skillLevel : string,
    learningGoals : string,
    weeklyHours : number,
    learningStyle: string[]

}
 export interface StepProps {
    data : OnboardingData
    updateData :(field : keyof OnboardingData, value : any) => void
    errors : Record <string, string>
 }

