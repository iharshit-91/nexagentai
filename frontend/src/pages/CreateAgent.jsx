import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Check, Plus, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAgentApi } from "@/features/agents/agentApi";

// ---------------- SENSE-STYLE DARK UI ----------------

const darkPanel =
  "border border-white/10 bg-card shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";

const fieldCls =
  "rounded-xl border-white/10 bg-card text-sm text-foreground backdrop-blur-xl placeholder:text-muted-foreground focus-visible:border-white/25 focus-visible:ring-0";

const availableTools = [
  
  {
    id: "web.search",
    name: "Web Search",
    description: "Search for information on the web",
  },
  {
    id: "gmail.read",
    name: "Read Emails",
    description: "Read and summarize emails",
  },
  {
    id: "gmail.send",
    name: "Send Emails",
    description: "Draft and send emails",
  },
  {
    id: "event.schedule",
    name: "schedule events",
    description: "Schdule Events On Google Calender",
  },
  {
    id: "image.analyze",
    name: "Analyze Image",
    description: "analyze image",
  },
  {
    id: "post.instagram",
    name: "Post on Instagram",
    description: "publish Post on Instagram",
  },
];

export default function CreateAgent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    instructions: "",
    model: "openai/gpt-oss-120b",
    tools: [],
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleTool = (toolId) => {
    setForm((previous) => ({
      ...previous,
      tools: previous.tools.includes(toolId)
        ? previous.tools.filter((item) => item !== toolId)
        : [...previous.tools, toolId],
    }));
  };

 
const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");

  if (!form.name.trim() || !form.instructions.trim()) {
    setError("Agent name and instructions are required.");
    return;
  }

  setSaving(true);

  try {
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      instructions: form.instructions.trim(),
      model: form.model,
      tools: form.tools,
    };

    await createAgentApi(payload);

    navigate("/agents", {
      replace: true,
      state: {
        successMessage: "Agent created successfully!",
      },
    });
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Unable to create agent. Please try again."
    );
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(139,92,246,0.16)_0%,#0B0F19_65%)] bg-background text-foreground">
      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,15,25,0.55)_100%)]"
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(139,92,246,0.35)]">
              <Workflow size={17} />
            </span>

            <span className="text-sm font-medium tracking-tight text-foreground/85">
              NexAgent
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-card px-3 py-2 text-xs text-foreground/85 transition hover:bg-white/10 hover:text-foreground"
          >
            <ArrowLeft size={14} />
            <span>Back to chat</span>
          </Link>
        </header>

        {/* Form */}
        <main className="mx-auto w-full max-w-2xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
          <div className="mb-9">
            <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_40px_rgba(139,92,246,0.35)]">
              <Bot size={24} />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Create an agent
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Configure your AI agent and define what it can do.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`space-y-7 rounded-3xl p-5 sm:p-7 ${darkPanel}`}
          >
            {/* Basic details */}
            <section className="space-y-5">
              <div>
                <label
                  htmlFor="agent-name"
                  className="mb-2 block text-xs font-medium text-foreground/85"
                >
                  Agent name <span className="text-violet-300">*</span>
                </label>

                <Input
                  id="agent-name"
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="e.g. Research Assistant"
                  maxLength={100}
                  required
                  className={`h-11 ${fieldCls}`}
                />
              </div>

              <div>
                <label
                  htmlFor="agent-description"
                  className="mb-2 block text-xs font-medium text-foreground/85"
                >
                  Description
                </label>

                <Input
                  id="agent-description"
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="What does your agent do?"
                  maxLength={500}
                  className={`h-11 ${fieldCls}`}
                />
              </div>

              <div>
                <label
                  htmlFor="agent-instructions"
                  className="mb-2 block text-xs font-medium text-foreground/85"
                >
                  Instructions <span className="text-violet-300">*</span>
                </label>

                <Textarea
                  id="agent-instructions"
                  value={form.instructions}
                  onChange={(event) =>
                    updateField("instructions", event.target.value)
                  }
                  placeholder="You are a helpful AI assistant. Your job is to..."
                  required
                  className={`min-h-40 resize-y leading-6 ${fieldCls}`}
                />
              </div>
            </section>

            {/* Model */}
            <section>
              <label
                htmlFor="agent-model"
                className="mb-2 block text-xs font-medium text-foreground/85"
              >
                AI model
              </label>

              <select
                id="agent-model"
                value={form.model}
                onChange={(event) =>
                  updateField("model", event.target.value)
                }
                className="h-11 w-full rounded-xl border border-white/10 bg-card px-3 text-sm text-foreground/85 outline-none transition [color-scheme:dark] focus:border-white/25 [&>option]:bg-sidebar [&>option]:text-foreground/85"
              >
                <option value="openai/gpt-oss-120b">
                  GPT-OSS 120B
                </option>

                <option value="openai/gpt-oss-20b">
                  GPT-OSS 20B
                </option>

               
              </select>
            </section>

            {/* Tools */}
            <section>
              <div className="mb-3">
                <h2 className="text-xs font-medium text-foreground/85">
                  Tools
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Select the capabilities available to your agent.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                {availableTools.map((tool, index) => {
                  const selected = form.tools.includes(tool.id);

                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => toggleTool(tool.id)}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition ${
                        index !== 0 ? "border-t border-white/[0.08]" : ""
                      } ${
                        selected
                          ? "bg-white/[0.09]"
                          : "bg-white/[0.02] hover:bg-card"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-medium text-foreground/85">
                          {tool.name}
                        </p>

                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>

                      <span
                        className={`flex size-[18px] shrink-0 items-center justify-center rounded-md border ${
                          selected
                            ? "border-white bg-primary text-primary-foreground"
                            : "border-white/20 text-transparent"
                        }`}
                      >
                        {selected && <Check size={12} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-xs text-red-300"
              >
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/")}
                className="rounded-xl text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
                className="h-10 rounded-xl bg-primary px-5 text-xs font-medium text-primary-foreground hover:bg-primary/85"
              >
                {saving ? "Creating..." : "Create agent"}
                {!saving && <Plus size={15} className="ml-2" />}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}