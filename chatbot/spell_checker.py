from symspellpy import SymSpell
from pkg_resources import resource_filename

sym_spell = SymSpell(max_dictionary_edit_distance=2)

dictionary_path = resource_filename(
    "symspellpy",
    "frequency_dictionary_en_82_765.txt"
)

sym_spell.load_dictionary(
    dictionary_path,
    term_index=0,
    count_index=1
)

def correct_spelling(text: str):
    suggestions = sym_spell.lookup_compound(
        text,
        max_edit_distance=2
    )

    if suggestions:
        return suggestions[0].term

    return text