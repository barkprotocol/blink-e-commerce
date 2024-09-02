"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SingleImageDropzone } from "../ui/ImageUpload";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import BlinkExample from "./BlinkRender";
import { useEdgeStore } from "@/providers/edgestore";
import { useGetSellerHook } from "@/hooks/useGetUser";
import { getSellerBlink, updateSellerBlink } from "@/lib/action";

interface EditBlinkProps {
  address: string;
}

function EditBlink({ address }: EditBlinkProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [editing, setIsEditing] = useState(false);

  const { data, isLoading } = useGetSellerHook(address);
  const router = useRouter();

  useEffect(() => {
    if (data && data.blink) {
      const { title, description, icon, label } = data.blink;
      setTitle(title);
      setDescription(description);
      setUrl(icon);
      setLabel(label);
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !description || !url || !label) {
      toast.warning("Please fill all fields and upload an image.");
      return;
    }

    const formData = { title, description, icon: url, label };
    const response = await updateSellerBlink(formData, address);

    if (response.err) {
      toast.warning(response.msg);
    } else {
      setIsEditing(false);
      toast.success(response.msg);
      // Optionally redirect after successful update
      router.push("/dashboard");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row p-3 gap-4">
      <div className="flex-1 md:border-r p-3">
        <div className="flex justify-center items-center max-w-[700px] md:w-full mx-auto p-5">
          <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Edit your Blink
              </CardTitle>
              <div className="flex items-center">
                <Switch
                  id="edit-mode"
                  checked={editing}
                  onCheckedChange={() => setIsEditing(!editing)}
                />
                <Label htmlFor="edit-mode" className="ml-2">
                  Edit Mode
                </Label>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={file}
                      disabled={!editing}
                      onChange={(file: File) => {
                        setFile(file);
                        setProgress(0);
                        setUrl("");
                      }}
                    />

                    <Progress
                      className="max-w-[300px] transition-all duration-150"
                      value={progress}
                    />
                    {(!url || url.trim() === "") && (
                      <Button
                        type="button"
                        disabled={!editing}
                        onClick={async () => {
                          if (file) {
                            toast.info("Uploading image...");
                            const res = await edgestore.imageUrlsBlinks.upload({
                              file,
                              onProgressChange: (progress) => setProgress(progress),
                            });
                            setUrl(res.url);
                            toast.success("Image uploaded successfully.");
                          }
                        }}
                      >
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="label"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Label
                  </Label>
                  <Input
                    id="label"
                    placeholder="Enter label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    rows={4}
                    required
                    disabled={!editing}
                  />
                </div>
              </CardContent>
              <CardFooter>
                {editing && (
                  <Button
                    className="w-full font-bold uppercase text-md"
                    type="submit"
                  >
                    Save
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <BlinkExample
          title={title}
          description={description}
          imageUrl={url}
          label={label}
        />
      </div>
    </div>
  );
}

export default EditBlink;
