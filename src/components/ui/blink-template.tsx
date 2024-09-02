"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BlinkTemplate() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {image ? (
              <img
                src={image}
                alt="Product preview"
                className="aspect-square w-full rounded-md object-cover"
                width={300}
                height={300}
              />
            ) : (
              <img
                src="/placeholder.svg"
                alt="Product placeholder"
                className="aspect-square w-full rounded-md object-cover"
                width={300}
                height={300}
              />
            )}
            <Button
              variant="outline"
              size="sm"
              className="justify-center"
              onClick={() => document.getElementById("fileInput")?.click()}
              aria-label="Upload product image"
            >
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              aria-label="File input for product image"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4 rounded-none border-none">
        <CardHeader className="border-t">
          <Input
            id="name"
            placeholder="Product Name"
            className="text-2xl font-bold bg-transparent border-0 focus:ring-0"
            aria-label="Product name"
          />
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input
              id="title"
              placeholder="Product Title"
              className="text-2xl font-bold bg-transparent border-0 focus:ring-0"
              aria-label="Product title"
            />
            <Textarea
              id="description"
              placeholder="Enter product description"
              className="min-h-[100px] bg-transparent border-0 focus:ring-0"
              aria-label="Product description"
            />
            <Input
              id="label"
              placeholder="Label"
              className="bg-transparent border-0 focus:ring-0"
              aria-label="Product label"
            />
            <Input
              id="price"
              type="number"
              placeholder="Price"
              className="bg-transparent border-0 focus:ring-0"
              aria-label="Product price"
            />
            <Button type="submit" className="justify-center" aria-label="Add product">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
