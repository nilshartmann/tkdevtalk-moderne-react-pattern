import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import RecipeListPageContent from "../../components/recipelistpage/RecipeListPageContent.tsx";
import { Suspense } from "react";
import { GlobalLoadingIndicator } from "../../components/material/GlobalLoadingIndicator.tsx";

const RecipePageListParams = z.object({
  page: z.number().min(0).optional(),
  orderBy: z.enum(["time", "rating"]).optional(),
  bookmarkedRecipeIds: z.string().array().optional(),
});
type TRecipePageListParams = z.infer<typeof RecipePageListParams>;

export const Route = createFileRoute("/recipes/")({
  component: () => (
    <Suspense fallback={<GlobalLoadingIndicator />}>
      <RecipeListPageContent />
    </Suspense>
  ),
  validateSearch: (search): TRecipePageListParams =>
    RecipePageListParams.parse(search),
});
