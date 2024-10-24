import { useState } from 'react';
import { Dialog, DialogOverlay, DialogContent, DialogTrigger, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from '@/src/components/shadcn/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './shadcn/avatar';
import { Label } from './shadcn/label';
import { Input } from './shadcn/input';
import { Button } from './shadcn/button';
import { useSession } from 'next-auth/react';

const baseImageUrl = 'https://dh2643images.blob.core.windows.net/profile-pictures/';

 function ProfileAvatar() {
  const session = useSession();
  const getMyProfileUrl = () => baseImageUrl + session.data?.id+ "?time=" + Date.now();
  const [image, setImage] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(getMyProfileUrl);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);

      const res = await fetch("/api/profileImage", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setAvatarUrl(getMyProfileUrl);
        setIsDialogOpen(false);

      } else {
        alert("Error uploading image.");
      }
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Avatar>
            <AvatarImage src={avatarUrl} alt="@profile" />
            <AvatarFallback>{session.data?.email.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a New Profile Image</DialogTitle>
          <DialogDescription>
            Choose a new profile picture to upload.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="file"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileAvatar;