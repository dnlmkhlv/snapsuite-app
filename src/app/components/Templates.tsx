"use client";

import { useState, useEffect } from "react";
import { Save, FolderOpen, Trash2, Plus } from "lucide-react";
import {
  TweetTemplate,
  saveTemplate,
  getTemplates,
  deleteTemplate,
} from "../utils/storage";

interface TemplatesProps {
  currentData: {
    content: string;
    username: string;
    verified: boolean;
    profilePhoto: string | null;
    fontFamily: string;
    backgroundColor: string;
    textColor: string;
  };
  onLoadTemplate: (template: TweetTemplate) => void;
}

export default function Templates({
  currentData,
  onLoadTemplate,
}: TemplatesProps) {
  const [templates, setTemplates] = useState<TweetTemplate[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;

    saveTemplate({
      name: templateName.trim(),
      ...currentData,
    });

    setTemplates(getTemplates());
    setTemplateName("");
    setShowSaveDialog(false);
  };

  const handleDeleteTemplate = (id: string) => {
    deleteTemplate(id);
    setTemplates(getTemplates());
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Saved Templates
        </h3>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Save
        </button>
      </div>

      {showSaveDialog && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium text-gray-800 mb-2">Save Template</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template name"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleSaveTemplate()}
            />
            <button
              onClick={handleSaveTemplate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {templates.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No saved templates yet
          </p>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <p className="text-xs text-gray-500">
                  {formatDate(template.createdAt)} •{" "}
                  {template.content.substring(0, 30)}...
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoadTemplate(template)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                  title="Load template"
                >
                  <FolderOpen className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                  title="Delete template"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
