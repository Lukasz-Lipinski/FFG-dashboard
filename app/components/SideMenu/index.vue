<template>
    <nav class="container-nav">
       <div>
         <NuxtLink v-for="link of links" :to="'/dashboard' + link.href" class="nav-link" active-class="active">
            <v-icon :icon="'mdi-'+link.icon" />
            {{ link.label }}
        </NuxtLink>
       </div>
        <div>
            <a class="nav-link">
                <v-icon icon="mdi-logout" />
                Logout
            </a>
        </div>
    </nav>
</template>

<script setup lang="ts">
type MenuLinkType = {
    href: string;
    label: string;
    icon: string;
}

const links: MenuLinkType[] = [
    {href: "/", label: "Dashboard", icon: "home"},
    {href: "/users", label: "Users", icon: "account"},
    {href: "/content", label: "Content", icon: "file-document-edit-outline "},
    {href: "/page", label: "Page", icon: "page"},
]

</script>

<style lang="css" scooped>
.container-nav {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #E5E7EB;

    .nav-link {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0.75rem 1rem;
        color: #111827;
        font-size: 0.95rem;
        font-weight: 500;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;

        .v-icon {
            margin: 0 0.5rem;
        }
    }

    .nav-link:hover {
        background-color: #F3F4F6;
        color: #1E5BFF;
    }

    .nav-link.active {
        background-color: #EBF2FF;
        color: #1E5BFF;
        font-weight: 600;
    }
}
</style>