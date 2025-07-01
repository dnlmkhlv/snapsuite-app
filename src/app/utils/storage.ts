export interface TweetTemplate {
  id: string;
  name: string;
  content: string;
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  textColor: string;
  fontFamily: string;
  backgroundColor: string;
  alignment: "left" | "center";
  gradientStart: string;
  gradientEnd: string;
  createdAt: number;
}

const STORAGE_KEY = "tweet-templates";

export const saveTemplate = (
  template: Omit<TweetTemplate, "id" | "createdAt">
): void => {
  try {
    const existingTemplates = getTemplates();
    const newTemplate: TweetTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    const updatedTemplates = [...existingTemplates, newTemplate];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTemplates));
  } catch (error) {
    console.error("Error saving template:", error);
  }
};

export const getTemplates = (): TweetTemplate[] => {
  try {
    const templates = localStorage.getItem(STORAGE_KEY);
    return templates ? JSON.parse(templates) : [];
  } catch (error) {
    console.error("Error loading templates:", error);
    return [];
  }
};

export const deleteTemplate = (id: string): void => {
  try {
    const templates = getTemplates();
    const updatedTemplates = templates.filter((template) => template.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTemplates));
  } catch (error) {
    console.error("Error deleting template:", error);
  }
};

export const loadTemplate = (id: string): TweetTemplate | null => {
  try {
    const templates = getTemplates();
    return templates.find((template) => template.id === id) || null;
  } catch (error) {
    console.error("Error loading template:", error);
    return null;
  }
};
