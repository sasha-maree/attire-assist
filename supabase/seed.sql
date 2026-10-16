-- Fictional shops for local development only.
insert into public.shops (id, slug, name)
values
    (
        '11111111-1111-4111-8111-111111111111',
        'velvet-rentals',
        'Velvet Rentals'
    ),
    (
        '22222222-2222-4222-8222-222222222222',
        'classic-closet',
        'Classic Closet'
    )
    on conflict (id) do nothing;