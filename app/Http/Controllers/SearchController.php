<?php

namespace App\Http\Controllers;

use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }


    private $notes;

    public function __invoke(Request $request): AnonymousResourceCollection|Array
    {
        if (!$request->hasAny(['text','datetime'])) return [];
        $this->notes = Auth::user()->notes();
        if ($request->has('text')){
            $text = $request->input('text');
            $this->search($text);
        }
        if ($request->has('datetime')) {
            $datetime = $request->input('datetime');
            $this->dateSearch($datetime);
        }

        $notes = $this->notes
            ->latest('updated_at')->get();

        return NoteResource::collection($notes);
    }

    private function search(?string $text): HasMany
    {
        $this->notes
            ->where(
                function (Builder $query) use ($text) {
                    $query->where('title', 'LIKE', "%$text%")
                    ->orWhere('body', 'LIKE', "%$text%");
                }
            );
        return $this->notes;
    }

    private function dateSearch(string $date): HasMany
    {

        $this->notes->whereDate(
            'updated_at',
            date_create_from_format('m/d/Y', $date)->format('Y-m-d')
        );
        return $this->notes;
    }
}
