"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SingleImageDropzone } from "@/components/ui/ImageUpload";
import { useEdgeStore } from "@/providers/edgestore";
import { Progress } from "@/components/ui/progress";
import { createSellerProduct } from "@/lib/action";
import { ProductInput } from "@/lib/validation";
import { useWallet } from "@solana/wallet-adapter-react";

interface ProductFormProps {
  closeModal: (value: boolean) => void;
}

export default function ProductForm({ closeModal }: ProductFormProps) {
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string>("");
  const { publicKey } = useWallet();

  const handleFileChange = async () => {
    if (file) {
      try {
        toast.info("Image uploading...");
        const res = await edgestore.imageUrlsBlinks.upload({
          file,
          onProgressChange: (progress) => setProgress(progress),
        });
        toast.success("Upload successful");
        setUrl(res.url);
      } catch (error) {
        toast.error("Upload failed");
      }
    }
  };

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const productData: ProductInput = {
      title,
      name,
      description,
      label,
      imageUrl: url,
      price: price.toString(),
      stock: stock.toString(),
    };

    try {
      const res = await createSellerProduct(publicKey.toString(), productData);
      toast.success("Product added successfully");
      closeModal(false);
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="p-3">
      <form className="p-4 flex flex-col gap-2" onSubmit={addProduct}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            required
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Label>Image</Label>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
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
              className="w-fit mb-2"
              onClick={handleFileChange}
            >
              Upload
            </Button>
          )}
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            required
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            required
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            required
            type="number"
            step="any"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            required
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <Button className="mt-2" type="submit">
          Add Product
        </Button>
      </form>
    </div>
  );
}
