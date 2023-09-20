import { useEffect, useState } from "react";

export const usePostForm = (initialData: any) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  useEffect(() => {
    if (initialData) {
      // initialData가 존재하면 폼 컨트롤의 초기값 설정
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  return { title, content, setTitle, setContent };
};
