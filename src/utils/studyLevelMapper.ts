
export const mapStudyLevelToView = (studyLevel: string | null | undefined): string => {
  if (!studyLevel) return 'home';
  
  switch (studyLevel.toLowerCase()) {
    case 'igcse':
      return 'igcse';
    case 'o-level':
    case 'olevel':
      return 'olevel';
    case 'a-level':
    case 'alevel':
      return 'alevel';
    default:
      return 'home';
  }
};
