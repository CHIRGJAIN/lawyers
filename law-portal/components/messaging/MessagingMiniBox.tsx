"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronUp, Ellipsis, ExternalLink } from "lucide-react";

type MessagingHook = {
  openPanel?: () => void;
  openThreadWith?: (value: unknown) => void;
};

let safeUseMessaging: () => MessagingHook = () => ({ openPanel: () => {} });

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const messagingModule = require("@/context/MessagingProvider");
  if (messagingModule?.useMessaging) {
    safeUseMessaging = messagingModule.useMessaging;
  }
} catch (error) {
  // Optional provider unavailable; fall back to no-op implementation.
}

export default function MessagingMiniBox() {
  const { openPanel } = safeUseMessaging?.() ?? {};
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return null;
  }

  const handleOpen = () => {
    if (typeof openPanel === "function") {
      openPanel();
    }
  };

  return (
    <div
      className="fixed right-2 bottom-2 sm:right-4 sm:bottom-3 z-50 select-none"
      data-testid="messaging-mini-box"
    >
      <div className="bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition px-3 py-2 min-w-[320px] max-w-[380px] w-[340px] sm:w-[360px]">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="h-8 w-8 rounded-full ring-2 ring-violet-400/60 overflow-hidden">
              <Image
                src="/avatar-placeholder.svg"
                alt="User avatar"
                width={32}
                height={32}
              />
            </div>
            <span
              aria-label="Online"
              className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
            />
          </div>

          <button
            type="button"
            onClick={handleOpen}
            className="text-sm font-medium text-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            aria-label="Open Messaging"
          >
            Messaging
          </button>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="More options"
              className="p-1.5 rounded-md hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Ellipsis className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleOpen}
              aria-label="Open full messaging"
              className="p-1.5 rounded-md hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ExternalLink className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse messaging mini box"
              className="p-1.5 rounded-md hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
