import Replicate from "replicate";

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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
  refImageBase64?: string
): Promise<string> {
  const styleModifier = STYLE_MODIFIERS[style] || STYLE_MODIFIERS["anime"];
  const fullPrompt = `${prompt}, ${styleModifier}, ${DEFAULT_AVATAR_PROMPT}`;

  // Using Flux Schnell for fast generation (2-4 seconds)
  // Alternative: stability-ai/sdxl for higher quality
  const model =
    "black-forest-labs/flux-schnell:c846a69991daf4c0e5d016514849d14ee5b2e6846ce6b9d6f21369e564cfe51e";

  const input: Record<string, unknown> = {
    prompt: fullPrompt,
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "png",
  };

  if (refImageBase64) {
    input.image = refImageBase64;
    input.prompt = `${prompt}, ${styleModifier}, consistent character with reference image`;
  }

  const output = await replicate.run(model, { input }) as unknown;

  // Output is an array of URLs
  const outputArray = output as string[];
  return outputArray[0];
}
