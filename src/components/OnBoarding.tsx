import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Services/contextApi/AuthContext";
import { supabase } from "../lib/supabase";
import type { OnboardingData } from "../types/onBoarding";
import Photo from "../assets/photo.jpg";

import ProgressBar from "../components/progressBar";
import InterestSelection from "../components/Onboarding/interest";
import SkillLevel from "../components/Onboarding/SkillLevel";
import LearningGoals from "../components/Onboarding/LearningGoal";
import TimeCommitment from "../components/Onboarding/Timing";
import LearningStyle from "../components/Onboarding/LearningStyle";
import toast from "react-hot-toast";
import { paths } from "../path";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<OnboardingData>({
    interests: [],
    skillLevel: "",
    learningGoals: "",
    weeklyHours: 10,
    learningStyle: [],
  });

  const totalSteps = 5;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user makes a selection
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (data.interests.length === 0) {
          newErrors.interests = "Please select at least one topic";
          toast.error("please select at least one topic");
        }
        break;
      case 2:
        if (!data.skillLevel) {
          newErrors.skillLevel = "Please select your skill level";
        }
        break;
      case 3:
        if (!data.learningGoals) {
          newErrors.learningGoals = "Please select your learning goal";
        }
        break;
      case 4:
        if (!data.weeklyHours || data.weeklyHours < 1) {
          newErrors.weeklyHours = "Please select your weekly commitment";
        }
        break;
      case 5:
        if (data.learningStyle.length === 0) {
          newErrors.learningStyle = "Please select at least one learning style";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Save to Supabase
      const { error } = await supabase.from("user_profiles").upsert({
        user_id: user?.id,
        interests: data.interests,
        skill_level: data.skillLevel,
        learning_goals: data.learningGoals,
        weekly_hours: data.weeklyHours,
        learning_style: data.learningStyle,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;

      // Success! Redirect to dashboard
      navigate(paths.dashbaord);
    } catch (error) {
      console.error("Error saving profile:", error);
      setErrors({ submit: "Failed to save your profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    const stepProps = { data, updateData, errors };
    switch (currentStep) {
      case 1:
        return <InterestSelection {...stepProps} />;
      case 2:
        return <SkillLevel {...stepProps} />;
      case 3:
        return <LearningGoals {...stepProps} />;
      case 4:
        return <TimeCommitment {...stepProps} />;
      case 5:
        return <LearningStyle {...stepProps} />;
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen white  relative overflow-hidden">
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Step Content */}
        <div className="flex-1 border h-full flex justify-between flex-row-reverse">
          <div className="max-w-4xl mx-auto flex flex-col justify-center items-center">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            {renderStep()}
            <div className="sticky bottom-0 bg-transparent backdrop-blur-lg border-t border-gray-200 py-6 px-4">
              <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
            ${
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 active:scale-95"
            }
          `}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white
          bg-purple-600 
         hover:to-purple-700
            shadow-lg hover:shadow-xl
            transition-all duration-200
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : currentStep === totalSteps ? (
                    <>
                      Complete
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Continue
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="h-screen w-[30%]  hidden md:block rounded-sm">
            <img src={Photo} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 py-6 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
            ${
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 active:scale-95"
            }
          `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

        
            <button
              onClick={handleNext}
              disabled={loading}
              className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:from-indigo-700 hover:to-purple-700
            shadow-lg hover:shadow-xl
            transition-all duration-200
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : currentStep === totalSteps ? (
                <>
                  Complete
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  Continue
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div> */}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl animate-slideUp">
          {errors.submit}
        </div>
      )}
    </div>
  );
}
