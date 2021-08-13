

 import countMoviesMock from '../__mock__/styleMock';

 document.body.innerHTML = `
 <header>
   <nav>
     <div class="nav-element"><input type="button" id="nav-count" class="button" value="Movies()"></div>
   </nav>
 </header>
 <section>
   <div class="card-container"></div>
 </section>  
`;
 describe('verify that the tests are working', () => {

   test('the number of element in the list should be the same as the output ',() => {
      const navCount = document.getElementById('nav-count'); 
    const testList = [
        {
          name: 'movie1',
          image: {medium: 'imgUrl'},
          summary: 'movie summary'
        }
      ];
      countMoviesMock(testList, navCount);
      expect(navCount.value).toBe('Movies(1)');
   })
 })