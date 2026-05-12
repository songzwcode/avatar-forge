import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);

// Style modifiers for game avatar generation
export const STYLE_MODIFIERS: Record<string, string> = {
  "sci-fi":
    "futuristic armor, neon highlights, holographic visor, sci-fi warrior, chrome details, LED accents, cinematic lighting, detailed, high quality",
  fantasy:
    "medieval armor, enchanted weapons, magical aura, fantasy warrior, ornate details, ethereal glow, epic pose, detailed, high quality",
  cyberpunk:
    "neon tattoos, chrome implants, leather jacket, cyberpunk character, night city aesthetic, rain-soaked, neon lights, detailed, high quality",
  anime:
    "large expressive eyes, vibrant hair, dynamic pose, anime style, cel shaded, vibrant colors, detailed linework, high quality",
  pixel:
    "retro 16-bit RPG sprite, limited color palette, pixel art style, game character, nostalgic, charming, 8-bit aesthetic",
  horror:
    "dark creature, glowing eyes, corrupted armor, horror monster, shadowy, demonic, sinister, detailed, high quality",
  steampunk:
    "brass goggles, mechanical limbs, gear ornaments, steampunk warrior, Victorian aesthetic, copper tones, steam effects, detailed",
  western:
    "cowboy hat, bandolier, weathered leather, western gunslinger, desert sunset, rugged, detailed, cinematic",
};

export const DEFAULT_AVATAR_PROMPT =
  "game character avatar, portrait, centered, clean background, detailed face, ready for game use";

export async function generateAvatar(
  prompt: string,
  style: string,
  _refImageBase64?: string
): Promise<string> {
  const styleModifier = STYLE_MODIFIERS[style] || STYLE_MODIFIERS["anime"];
  const fullPrompt = prompt + ", " + styleModifier + ", " + DEFAULT_AVATAR_PROMPT;

  // Using Stable Diffusion XL on Hugging Face (free tier)
  const model = "stabilityai/stable-diffusion-xl-base-1.0";

  const base64 = await hf.textToImage({
    inputs: fullPrompt,
    model,
    parameters: {
      height: 512,
      width: 512,
      guidance_scale: 7.5,
      num_inference_steps: 30,
    },
  });
  return base64;
}
