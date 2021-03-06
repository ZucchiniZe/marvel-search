from django.contrib import admin
from django.core import urlresolvers

from .models import Comic, Issue, Creator
from .jobs import scrape_issues


class ComicAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'issue_count', 'run', 'scraped', 'refreshed_at')
    list_filter = ('scraped', 'refreshed_at')
    search_fields = ('title',)
    actions = ['scrape_issues']

    def scrape_issues(self, request, queryset):
        for item in queryset:
            scrape_issues.delay(item.pk, item)
        self.message_user(request, '{0:d} comics queued for scraping'.format(len(queryset)))
    scrape_issues.short_description = 'Scrape selected comics'


class IssueAdmin(admin.ModelAdmin):
    list_display = ('title', 'num', 'link_to_comic')

    def link_to_comic(self, obj):
        link=urlresolvers.reverse("admin:listing_comic_change", args=[obj.comic.id])
        return u'<a href="{0!s}">{1!s}</a>'.format(link, obj.comic.title)
    link_to_comic.allow_tags=True


class CreatorAdmin(admin.ModelAdmin):
    list_display = ('name', 'published_issues')


admin.site.register(Comic, ComicAdmin)
admin.site.register(Issue, IssueAdmin)
admin.site.register(Creator, CreatorAdmin)
