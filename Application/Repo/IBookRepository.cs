using Application.ViewModel;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public interface IBookRepository 
    {
        Task<List<BooksViewModel>> GetBookList();

        Task<List<Books>> GetBooks();

    }
}
