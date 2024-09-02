"use client";

import { useState } from "react";
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
import { useEdgeStore } from "@/providers/edgestore";
import { SingleImageDropzone } from "../ui/ImageUpload";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import BlinkExample from "./BlinkRender";
import { SellerBlinkInput, SellerBlinkSchema } from "@/lib/validation";
import { createSellerBlink } from "@/lib/action";
import { useRouter } from "next/navigation";

interface CreateBlinkCompProps {
  address: string;
}

export function CreateBlinkComp({ address }: CreateBlinkCompProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address) {
      toast.warning("Connect your wallet");
      return;
    }
    if (!url) {
      toast.warning("Upload an image");
      return;
    }
    if (!title || !description || !label) {
      toast.warning("Fill out all fields");
      return;
    }

    try {
      const formData: SellerBlinkInput = {
        title,
        description,
        icon: url,
        label,
        sellerWallet: address,
      };

      // Validate form data
      await SellerBlinkSchema.parse(formData);

      const response = await createSellerBlink(formData);

      if (response.err) {
        toast.warning(response.msg);
        return;
      }

      router.push("/dashboard");
      toast.success("Successfully created your Blink");
    } catch (error) {
      toast.error("Failed to create Blink: " + (error as Error).message);
    }
  };

  const handleImageUpload = async () => {
    if (file) {
      toast.info("Uploading image...");
      try {
        const res = await edgestore.imageUrlsBlinks.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
            console.log("Upload Progress:", progress);
          },
        });
        setUrl(res.url);
        toast.success("Upload successful");
      } catch (error) {
        toast.error("Image upload failed: " + (error as Error).message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-3 gap-4">
      <div className="flex-1 md:border-r p-3">
        <div className="flex justify-center items-center max-w-[700px] md:w-full mx-auto p-5">
          <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Create Your Blink Store
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
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
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={file}
                      onChange={(file: File | undefined) => {
                        setFile(file);
                        setProgress(0);
                        setUrl("");
                      }}
                    />
                    <Progress
                      className="max-w-[300px] transition-all duration-150"
                      value={progress}
                    />
                    {!url && (
                      <Button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={!file}
                      >
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full font-bold uppercase text-md"
                  type="submit"
                >
                  Create Blink
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <BlinkExample
          description={description}
          imageUrl={url}
          title={title}
          label={label}
        />
      </div>
    </div>
  );
}
