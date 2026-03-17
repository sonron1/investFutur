// Kept for backward compatibility — AOS removed, use useScrollReveal instead
export const useAOS = () => {
  return {
    refreshAOS: () => {},
    initAOSOnMount: () => {},
  }
}
