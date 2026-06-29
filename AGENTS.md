<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Design rules

- **Section bg colors alternate strictly black ↔ white.** Use `bg-black text-white` (with `border-white/15` on cards, `text-white/75` body, `bg-white/5` card fills, `Cta variant="gold"` instead of `dark`) for dark sections, and `bg-white` (cards default to `bg-bone` for contrast, `border-black/10`) for light sections.
- **The first section of every page must be black.** Any new route's top hero/header section starts with `bg-black text-white` so the transition out of the fixed transparent header reads cleanly. Pages that previously used `bg-bone` or `bg-ink` as the first section have been normalized; keep this pattern when adding routes.
- The site footer is light (`bg-white text-ink`) since the final page section is black — preserve that contrast.
