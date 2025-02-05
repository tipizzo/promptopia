'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get the session
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  console.log("Prompt ID:", promptId);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return; // Check if promptId exists

      try {
        const response = await fetch(`/api/prompt/${promptId}`);


        const data = await response.json();
        console.log("API Response:", data);

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id, // Use session.user.id
          tag: post.tag,
        }),
      });

    } catch (error) {
      console.error("Error updating prompt:", error);
      alert('Failed to update prompt');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default EditPrompt;