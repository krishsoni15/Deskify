"use client";

import { AppWindow } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { generateAppId } from "@/lib/utils";

interface AppDetailsProps {
  name: string;
  appId: string;
  version: string;
  author: string;
  description: string;
  onNameChange: (value: string) => void;
  onAppIdChange: (value: string) => void;
  onVersionChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function AppDetails({
  name,
  appId,
  version,
  author,
  description,
  onNameChange,
  onAppIdChange,
  onVersionChange,
  onAuthorChange,
  onDescriptionChange,
}: AppDetailsProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md hover:border-primary/40 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <AppWindow className="h-4 w-4" />
          </div>
          Application Identity & Metadata
        </CardTitle>
        <CardDescription className="text-xs">
          Set your desktop app title, bundle identifier, version tag, and author info.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Compact 2-column grid for name and bundle ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Application Name"
            id="app-name"
            required
            value={name}
            onChange={(e) => {
              const newName = e.target.value;
              onNameChange(newName);
              if (!appId || appId === generateAppId(name)) {
                onAppIdChange(generateAppId(newName));
              }
            }}
            placeholder="My Website"
          />
          <Input
            label="Application Bundle ID"
            id="app-id"
            required
            value={appId}
            onChange={(e) => onAppIdChange(e.target.value)}
            placeholder="com.deskify.mywebsite"
            className="font-mono text-xs tracking-tight"
            hint="Auto-generated unique bundle ID"
          />
        </div>

        {/* Compact 2-column grid for version and author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Version"
            id="app-version"
            required
            value={version}
            onChange={(e) => onVersionChange(e.target.value)}
            placeholder="1.0.0"
            className="font-mono text-xs"
          />
          <Input
            label="Author / Developer"
            id="app-author"
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
            placeholder="Your name or company"
          />
        </div>

        {/* Description full width */}
        <Textarea
          label="App Description"
          id="app-description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="A high-performance desktop application wrapper for..."
          rows={2}
        />
      </CardContent>
    </Card>
  );
}

